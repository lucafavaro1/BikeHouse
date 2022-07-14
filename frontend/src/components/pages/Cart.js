import { Button, Row, Col, Nav, Card, Modal, Container } from "react-bootstrap";
import axios from "axios";
import AxiosJWT from "../utils/AxiosJWT";
import React, { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
// import "../css/SellBike.css";
import DropBox from "../../features/Dropbox";
import ShowImage from "../../features/ShowImage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Input } from "@material-ui/core";
import { selectUser, AUTH_TOKENS, logout } from "../../features/userSlice";
import rocketImg from "../pictures/rocket.png";
import { Navigate } from "react-router-dom";
import { Autocomplete, Chip, Divider, FormControl, FormHelperText, InputLabel, TextField, Typography } from "@mui/material";
import '../css/Cart.css'
import { Box, fontSize } from "@mui/system";
import countries from "../constants/countries";

function Cart() {
  const user = useSelector(selectUser);
  const [step, setStep] = useState(2);
  
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [address, setAddress] = useState(""); 
  const [address2, setAddress2] = useState(""); 
  const [country, setCountry] = useState(""); 
  const [city, setCity] = useState(""); 
  const [zip, setZip] = useState(""); 
  const [code, setCode] = useState("");  
  const [phone, setPhone] = useState("");


  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const shipping = [
      firstName,
      lastName,
      address,
      address2,
      city,
      country,
      zip,
      code,
      phone
    ]
    console.log(shipping)
    setStep(3)
  }

  function ErrorMessage({ message }) {
    return <div className="alert alert-danger">{message}</div>;
  }

  function renderSwitch(param) {
    switch (param) {
      case 1:
        return (
          <Container >
            <Row className="heading">
              <Col xs={8}>
                <Typography
                  variant="h6"
                  sx={{
                    display: { xs: "none", md: "inline" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#2e6076",
                    textDecoration: "none",
                    fontSize: 30, 
                  }}
                  >
                  Shopping Cart
                </Typography>
                <Divider/>
              </Col>
              <Col>
                <Typography
                  variant="h6"
                  sx={{
                    display: { xs: "none", md: "inline" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#2e6076",
                    textDecoration: "none",
                    fontSize: 30, 
                  }}
                  >
                  Summary
                </Typography>     
                <Divider />
              </Col>
            </Row>

            <Row>
              <Col xs={8}>                
                  <Row>
                    item 1
                  </Row>
                  <Row>
                    item 2
                  </Row>
                  <Row>
                    item 3
                  </Row>
              </Col>
              <Col xs={4} className="row amount">
                  <h5 className="col-8">SUBTOTAL</h5>
                  <h5 className="col-4">$$$</h5>
                  <h5 className="col-8">SHIPPING</h5>
                  <h5 className="col-4">$$$</h5>
                  <h5 className="col-8">TAXES</h5>
                  <h5 className="col-4">$$$</h5>
                  <hr className="col-12"/>
                  <h4 className="col-8">TOTAL</h4>
                  <h4 className="col-4">$$$</h4>
              </Col>
            </Row>

          <Row>
            <Col>
              <Button
                className="mt-3 mb-3 continue"
                onClick={() => {
                  navigate("/buy");
                }}
              >
                Continue Shopping
              </Button>
            </Col>
            <Col />
            <Col>
              <Button
                className="mt-3 mb-3 next"
                onClick={() => {
                  setStep(2);
                }}
                >
                Next
              </Button>
            </Col>
          </Row>
        </Container>
        );
      case 2:
        return (
          <Container>
            <Row className="heading">
              <Col xs={8}>
                <Typography
                  variant="h6"
                  sx={{
                    display: { xs: "none", md: "inline" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#2e6076",
                    textDecoration: "none",
                    fontSize: 30, 
                  }}
                  >
                  Shipping Details
                </Typography>
                <Divider/>
              </Col>
              <Col>
                <Typography
                  variant="h6"
                  sx={{
                    display: { xs: "none", md: "inline" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#2e6076",
                    textDecoration: "none",
                    fontSize: 30, 
                  }}
                  >
                  Summary
                </Typography>     
                <Divider />
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
              <FormControl required className="address">  
                <Row>
                  <Col>
                    <TextField
                      sx={{
                        mt: '4vh',
                        width: '20vw'
                      }}
                      className="form-control"
                      label="First Name"
                      value={firstName}
                      variant="outlined"
                      onChange={(e) => {
                        setFirstName(e.target.value)
                      }}
                    />
                  </Col>
                  <Col>
                    <TextField
                        sx={{
                          mt: '4vh',
                          width: '20vw'
                        }}
                        className="form-control"
                        label="Last Name"
                        value={lastName}
                        variant="outlined"
                        onChange={(e) => {
                          setLastName(e.target.value)
                        }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField
                      fullWidth
                      className="form-control"
                      sx={{mt: '4vh'}}
                      id="filled-basic"
                      label="Address"
                      value={address}
                      variant="outlined"
                      onChange={(e) => {
                        setAddress(e.target.value)
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                 <Col>
                    <TextField
                      fullWidth
                      className="form-control"
                      sx={{mt: '4vh'}}
                      id="filled-basic"
                      label="Address 2"
                      value={address2}
                      variant="outlined"
                      
                      onChange={(e) => {
                        setAddress2(e.target.value)
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Autocomplete
                      id="country-select"
                      sx={{
                        mt: '4vh',
                        width: '20vw'
                      }}
                      options={countries}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.label} ({option.code}) +{option.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose a country"
                          className="form-control"
                        />
                        )}
                      onChange={(event, value) => {
                        setCountry(value.label)
                        setCode('+'+value.phone)
                      }}
                    />
                  </Col>
                  <Col>
                    <TextField
                      className="form-control"
                      sx={{
                        mt: '4vh',
                        width: '20vw'
                      }}
                      id="filled-basic"
                      label="City"
                      value={city}
                      variant="outlined"
                      onChange={(e) => {
                        setCity(e.target.value)
                      }}
                      />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField
                    className="form-control"
                      sx={{
                        mt: '4vh',
                        width: '20vw'
                      }}
                      id="filled-basic"
                      label="Zip/Postal Code"
                      value={zip}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      variant="outlined"
                      onChange={(e) => {
                        setZip(e.target.value)
                      }}
                      />
                  </Col>
                  <Col>
                    <TextField
                      className="form-control"
                      sx={{
                        mt: '4vh',
                        width: '5vw'
                      }}
                      id="filled-basic"
                      label="Code"
                      variant="outlined"
                      value= {code}
                      onChange={(e) => {
                        setCode(e.target.value)
                      }}
                      InputProps ={{readOnly: true}}
                    />
                  </Col>
                  <Col>
                    <TextField
                      sx={{
                        mt: '4vh',
                        width: '13vw'
                      }}
                      type='tel'
                      label="Phone Number"
                      value={phone}
                      variant="outlined"
                      onChange={(e) => {
                        setPhone(e.target.value)
                      }}
                      />
                  </Col>
                </Row>
                {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            </FormControl>
            </Col>
            <Col xs={4} className="amount">                
              <Row>
                item 1
              </Row>
              <Row>
                item 2
              </Row>
              <Row>
                item 3
              </Row>
              <br/>
              <br/>
              <br/>
              <Row>
                <h5 className="col-8">SUBTOTAL</h5>
                <h5 className="col-4">$$$</h5>
              
              </Row>
              <Row>
                <h5 className="col-8">SHIPPING</h5>
                <h5 className="col-4">$$$</h5>
              </Row>
              <Row>
                <h5 className="col-8">TAXES</h5>
                <h5 className="col-4">$$$</h5>
              </Row>
              <hr className="col-12"/>
              <Row>
                <h4 className="col-8">TOTAL</h4>
                <h4 className="col-4">$$$</h4>
              </Row>
              
            </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  className="mt-3 mb-3 continue"
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Back
                </Button>
              </Col>
              <Col />
              <Col>
                <Button
                  className="mt-3 mb-3 next"
                  onClick={handleSubmit}
                  >
                  Next
                </Button>
              </Col>
            </Row>
          </Container>
          );

      case 3:
        return (
          <Container className="shipping">
            <Row>
              <Col>
                <Button
                  className="mt-3 mb-3 continue"
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  Back
                </Button>
              </Col>
              <Col />
              <Col>
                <Button
                  className="mt-3 mb-3 next"
                  onClick={() => {
                    alert("Implement payment");;
                  }}
                >
                  Pay Now
                </Button>
              </Col>
            </Row>
          </Container>
          );
      default:
        return <p> Something went wrong, please refresh the page</p>;
    }
  }

  if (!user) {
    return <Navigate to="/login" replace />;
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
        <div className="cart content">
          <Nav justify variant="tabs" activeKey={step} className="navbar_state">
            <Nav.Item>
              <Nav.Link eventKey="1">1. Shopping Cart</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2">2. Shipping Address</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3">3. Payment</Nav.Link>
            </Nav.Item>
          </Nav>

          {renderSwitch(step)}
        </div>
      )}
    </>
  );
}

export default Cart;
