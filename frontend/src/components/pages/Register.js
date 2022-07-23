//function to load the Create an Account page

import { CircularProgress } from "@material-ui/core";
import Axios from "axios";
import { listCities } from "cclist";
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/userSlice";
import "../css/LoginRegister.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState(0);
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //post request to backend
  const performRegistration = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await Axios.post("http://localhost:3001/createUser", {
      firstName,
      lastName,
      birthDate,
      street,
      number,
      city,
      zip,
      email,
      password,
    })
      .then(() => {
        setIsLoading(false);
        performLogin();
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  //perform auto login after a new registration and redirect to dashboard 
  const performLogin = async () => {
    setIsLoading(true);

    try {
      const response = await Axios.post("http://localhost:3001/loginUser/", {
        email,
        password,
      });
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
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
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
          <div className="row justify-content-center ml-0 mr-0">
            <div className="col-lg-8">
              <div className="register">
                <h1>Welcome to BikeHouse!</h1>
                <h5>
                  Please fill in the form below to register on our website
                </h5>
                <hr></hr>
                Personal information
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
                      placeholder="Birth Date"
                      onChange={(e) => {
                        setBirthdate(e.target.value);
                      }}
                    />
                  </div>

                  <hr className="lines"></hr>
                  <div className="mb-3"> Billing Address</div>

                  <div className="row">
                    {" "}
                    <div className="form-group col-8">
                      <input
                        required
                        className="form-control"
                        placeholder="Street name"
                        onChange={(e) => {
                          setStreet(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group col-4 pl-0">
                      <input
                        required
                        type="number"
                        className="form-control"
                        placeholder="Number"
                        onChange={(e) => {
                          setNumber(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <select
                      required
                      className="form-control"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    >
                      <option value="">Select City</option>
                      {/* since they are 780 cities and are ordered by population, I keep the first 200 that have > 50k inhabitants */}
                      {listCities("DE", { limit: 200 })
                        .sort()
                        .map((city) => {
                          return <option value={city}>{city}</option>;
                        })}
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      required
                      type="number"
                      className="form-control"
                      placeholder="ZIP code"
                      onChange={(e) => {
                        setZip(e.target.value);
                      }}
                    />
                  </div>

                  <hr className="lines"></hr>
                  <div className="mb-3">Login credentials</div>

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
