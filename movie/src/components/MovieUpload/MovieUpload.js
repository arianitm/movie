import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { Settings } from "../../common/settings";
import Slider from "react-slick";
import "../MovieListing/MovieListing.scss";
import "../MovieCard/MovieCard.scss";
import { successMessage, errorMessage } from "../../messages";
import { ToastContainer } from "react-toastify";

const MovieUpload = (props) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [moviesList, setMoviesList] = useState("");

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const fileRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(fileRef, file);
    await uploadTask.on("state_change", () => {
      setFileUrl(uploadTask);
      console.log(uploadTask);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    if (!title || !description || !fileUrl) {
      errorMessage();
      return;
    } else {
      successMessage();
    }

    const isTitle = moviesList.some((storedMovie) => {
      const isSame = storedMovie.title === title;
      return isSame;
    });

    if (isTitle) {
      errorMessage();
      return;
    }

    await addDoc(collection(db, "movies2"), {
      title: title,
      description: description,
      avatar: fileUrl?._uploadUrl,
    });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const newPost = await onSnapshot(
        collection(db, "movies2"),
        (snapshot) => {
          setMoviesList(snapshot.docs.map((doc) => doc.data()));

          return newPost;
        }
      );
    };
    fetchMovies();
  }, []);

  console.log(moviesList, "test");

  let renderMyList = "";
  renderMyList = Object.keys(moviesList).map((product) => {
    return (
      <div className="card-item">
        <div className="card-inner ">
          <div className="card-top">
            <img src={moviesList[product].avatar} alt="avatar" />
          </div>
          <div className="card-bottom">
            <div className="card-info">
              <h4>{moviesList[product].title}</h4>
              <p>{moviesList[product].description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div style={{ height: "700px" }}>
      <ToastContainer />
      <form onSubmit={onSubmit}>
        <h1>Upload Movie</h1>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" className="form-controll" />
        </div>
        <div className="form-group">
          <label htmlFor="caption">Caption</label>
          <input type="text" name="description" className="form-controll" />
        </div>

        <div className="form-group file-area">
          <label htmlFor="images">Images</label>
          <input onChange={onFileChange} type="file" />
          <div className="file-dummy">
            <div className="">Add File:</div>
            <div className="default">Please select some files</div>
          </div>
        </div>

        <div className="form-group">
          <button type="submit">Upload Movie</button>
        </div>
      </form>
      <div className="movie-wrapper">
        <div className="movie-wrapper">
          <div className="movie-list">
            <h2>My List</h2>
            <div className="movie-container">
              <Slider {...Settings}>{renderMyList}</Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieUpload;
