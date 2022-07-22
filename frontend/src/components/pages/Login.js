import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/userSlice";
import "../css/LoginRegister.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/loginUser/", {
        email,
        password,
      });
      setUser(response.data.firstName);
      dispatch(
        login({
          name: response.data.firstName,
          surname: response.data.lastName,
          birthdate: response.data.birthdate,
          verificationPictures: response.data.verificationPictures,
          email: email,
          loggedIn: true,
          userId: response.data.id,
          balance: response.data.balance,
          isVerified: response.data.isVerified,
          averageRating: response.data.averageRating,
          billingAddress: response.data.billingAddress,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
      navigate(-1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Please make sure your email and password are correct");
      console.log(error);
    }
    setIsLoading(false);
  };

  function ErrorMessage({ message }) {
    return <div className="alert alert-danger">{message}</div>;
  }

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 150 + "px",
            marginBottom: 150 + "px",
          }}
        >
          <CircularProgress size={100} style={{ color: "#2e6076" }} />
        </div>
      ) : (
        <div className="loginRegister content" id="login">
          <div className="justify-content-center">
            <div className="login">
              <h1>Welcome to BikeHouse!</h1>
              <h2>Sign in</h2>

              <form onSubmit={loginUser}>
                <div className="form-group">
                  <input
                    type="email"
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
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="form-check">
                  <label className="switch">
                    <input type="checkbox" checked={true} />
                    <span className="slider round "></span>
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
      )}
    </>
  );
}

export default Login;
