import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { CircularProgress } from "@material-ui/core";
import "../css/LoginRegister.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const performRegistration = (event) => {
    event.preventDefault();
    setIsLoading(true);
    Axios.post("http://localhost:3001/createUser", {
      firstName,
      lastName,
      birthDate,
      email,
      password,
    })
      .then((response) => {
        console.log(response.data.firstName);

        setUser(response.data.firstName);
        console.log(`Register in user: ${user}`);
        setIsLoading(false);

        navigate("/");
        alert("You successfully registered! Please log in to see your profile");
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

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
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="login">
                <h1>Welcome to BikeHouse!</h1>
                <h2>Register</h2>

                <form onSubmit={performRegistration}>
                  <div className="form-group">
                    <input
                      required
                      className="form-control"
                      placeholder="First Name"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      required
                      className="form-control"
                      placeholder="Last Name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      required
                      type="date"
                      className="form-control"
                      placeholder="Date of Birth"
                      onChange={(e) => {
                        setBirthdate(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      required
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
                      required
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>

                  <button
                    className="btn btn-lg btn-block btn-success"
                    type="submit"
                  >
                    Register
                  </button>
                </form>

                <div className="row justify-content-center">
                  <p className="link">
                    {" "}
                    Already registered? <a href="/">Log in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
