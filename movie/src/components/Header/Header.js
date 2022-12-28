import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import "./Header.scss";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const [term, setTerm] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please enter term");
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigation("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            className="inputHeader"
            type={"text"}
            value={term}
            placeholder="Search movies or shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      {authCtx.authUser ? (
        <>
          <Link to="/movieupload">
            <div className="register"> My Movies</div>
          </Link>
          <Link onClick={userSignOut}>Sign Out</Link>
        </>
      ) : (
        <div className="header">
          <Link to="/login">
            <div className="login"> Login</div>
          </Link>
          <Link to="/register">
            <div className="register"> Register</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
