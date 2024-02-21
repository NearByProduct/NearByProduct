import React, { useState } from "react";
import "./styles/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { login } from "../actions/useraction";
import {  useDispatch } from "react-redux";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const dispatch=useDispatch();

  const handleSubmit = async () => {
    console.log("called");
    dispatch(login(email,password));
  };

  return (
    <div className="body">
      <div className="center-div">
        <div className="heading">
          <h2>Login to your account</h2>
        </div>
        <div className="content">
          <div>
            <label>Email address</label>
            <br />
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="options">
            <div className="checkbox-container">
              <input type="checkbox" className="checkbox" />
              <span>Remember me</span>
            </div>

            <div>
              <a>Forgot your password?</a>
            </div>
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>

          <p>
            Not have any account?{" "}
            <Link to="/sign-up">
              <span className="sign-up">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
