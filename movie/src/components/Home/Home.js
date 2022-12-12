import React, { useContext, useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import MovieUpload from "../MovieUpload/MovieUpload";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import AuthContext from "../../context/AuthContext";

const Home = (props) => {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const movieText = "Harry";
  const showText = "Friends";
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      {authCtx.authUser ? <MovieUpload></MovieUpload> : <MovieListing />}
    </div>
  );
};

export default Home;
