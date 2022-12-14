import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { successMessageRegister, errorMessage } from "../../messages";
import { ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    console.log("jededjwejd");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        console.log(userCredential.user.accessToken);
        successMessageRegister();
        setTimeout(() => {
          navigation("/");
        }, 2000);
      })
      .catch((error) => {
        errorMessage();
        console.log(error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="login-box">
        <h2>Create Account</h2>
        <form onSubmit={signUp}>
          <div className="user-box">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label>Password</label>
          </div>
          <button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
