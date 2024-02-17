import React, { useState } from "react";
import "./styles/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/user/login",
      formData
    );
    console.log(data);
    if (!data.success) {
      console.log("Email or password entered is wrong");
    } else {
      setUser(data.user);
    }
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
