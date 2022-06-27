import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/LoginRegister.css";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/loginUser/", {
        email,
        password,
      });
      setUser(response.data.firstName);
      dispatch(
        login({
          name: response.data.firstName,
          email: email,
          loggedIn: true,
          userId: response.data.id,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
      navigate("/");
    } catch (error) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setErrorMessage("Please make sure your email and password are correct");
      console.log(error);
    }
  };

  function ErrorMessage({ message }) {
    return <div className="alert alert-danger">{message}</div>;
  }

  return (
    <div className="loginRegister content" id="login">
      <div className="justify-content-center">
        <div className="login">
          <h1>Welcome to BikeHouse!</h1>
          <h2>Sign in</h2>

          <form onSubmit={loginUser}>
            <div className="form-group">
              <input
                type="email"
                ref={emailRef}
                className="form-control"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                ref={passwordRef}
                className="form-control"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="form-check">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <label className="form-check-label">Remember me</label>

              <label className="link">
                <a href="/">Forgot Password?</a>
              </label>
            </div>

            <input
              className="btn btn-lg btn-block btn-secondary"
              type="submit"
              value="Submit"
            ></input>
          </form>

          {errorMessage.length > 0 ? (
            <ErrorMessage message={errorMessage} />
          ) : (
            <p></p>
          )}

          <div className="row justify-content-center">
            <p className="link">
              {" "}
              No account? <a href="/register">Register now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
