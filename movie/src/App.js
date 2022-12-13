import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Register from "./components/Auth/Register";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:imdbID" element={<MovieDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;
