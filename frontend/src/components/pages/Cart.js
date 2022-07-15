import { Button, Row, Col, Nav, Card, Modal, Container, Image } from "react-bootstrap";
import axios from "axios";
import AxiosJWT from "../utils/AxiosJWT";
import React, { useState, useEffect } from "react";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress, ImageList, Input, MenuItem, Select } from "@material-ui/core";
import { selectUser, AUTH_TOKENS, logout } from "../../features/userSlice";
import { Navigate } from "react-router-dom";
import { Autocomplete, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormHelperText, InputLabel, TextField, Typography } from "@mui/material";
import '../css/Cart.css'
import "../css/cartItem.css";
import { Box, fontSize } from "@mui/system";
import countries from "../constants/countries";
import { connect } from "react-redux";
import CartItem from "../reusable/cartItem";
import { selectCart } from "../../features/cartSlice";
import {removeFromCart} from "../../features/cartSlice";


const Cart = () => {
  const user = useSelector(selectUser);
  console.log(user)
  const cart = useSelector(selectCart);
  console.log("item in cart", cart)
  const [step, setStep] = useState(1);
  
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [address, setAddress] = useState(""); 
  const [address2, setAddress2] = useState(""); 
  const [country, setCountry] = useState(""); 
  const [city, setCity] = useState(""); 
  const [zip, setZip] = useState(""); 
  const [code, setCode] = useState("");  
  const [phone, setPhone] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalIns, setTotalIns] = useState(0);
  
  useEffect(() => {
    let items = 0;
    let price = 0;
    let insCost = 0;
    // cart.forEach((item) => {
    //   items += item.qty;
    //   price += item.qty * item.price;
    // });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  console.log("item in cart", cart)

  
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const cartOptions = Object.keys(cart).map(key => 
  //   <option key={key} value={key}>{tifs[key]}</option>
  // )

  const insProviders= {
    "Insurance 1": 20,
    "Insurance 2": 30,
    "Insurance 3": 15
  }

  const [insurance, setInsurance] = useState("");
  const [insCost, setInsCost] = useState(0);
  const [isInsurance, enableInsurance] = useState(true);
  const handleInsurance = (e) =>  {
      setInsurance(e.target.value)
      setInsCost(insProviders[e.target.value])
      // setInsCost()
  }
  
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
              <Col xs={7}>
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
              <Col />
              <Col xs={4}>
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
              <Col xs={7}>   
                  <Card xs={12} style={{'margin-top':'3vh', 'padding':'2vh'}}>
                    <Row>
                      <Col xs={3} style={{'margin':'0, 0,0 ,0','padding':'0', 'padding-left':'10px'}}>
                        <img src={cart.images[0].url} style={{'width': '80%' }}></img>
                      </Col>
                      {/* <Col /> */}
                      <Col xs={3}>
                        <h5>Brand</h5>
                        <h5>Model</h5>
                        <h5>Price</h5>
                      </Col>
                      <Col xs={1}>
                        <h5>:</h5>
                        <h5>:</h5>
                        <h5>:</h5>
                      </Col>
                      <Col xs={3}>
                        <h5>{cart.brand}</h5>
                        <h5 >{cart.model}</h5>
                        <h5 >$ {Math.round(cart.price*100)/100}</h5>
                      </Col>
                      <Col xs={2} className='cartItem__actions'>
                      <button
                        onClick={() => dispatch(removeFromCart(cart.id))}
                        className='actions__deleteItemBtn'
                      >
                        <DeleteIcon/>
                      </button>
                      </Col>

                    </Row>
                    <Row style={{'margin-top':'4vh'}}>
                      <Col xs={1}>
                            <LocationCityIcon sx={{  color: 'grey', display: 'block', fontSize: 'xlarge'}}/>
                      </Col>
                      <Col xs={3} style={{'text-align':'left'}}>
                            <h5>{cart.location}</h5>  
                      </Col>
                      <Col>
                        <FormControlLabel control={<Checkbox defaultChecked onChange={(e)=>{enableInsurance(e.target.checked)}}/>} label="Get Insurance" />
                      </Col>
                      <Col xs={4}>
                        <FormControl fullWidth>
                          {/* <InputLabel>Insurance</InputLabel> */}
                          <Select
                            id="demo-simple-select-helper"
                            disabled={!isInsurance}
                            value={insurance}
                            label="Insurance"
                            variant="outlined"
                            onChange={handleInsurance}
                          >
                            {/* <MenuItem value="">
                              <em>None</em>
                            </MenuItem> */}
                            <MenuItem value={'Insurance 1'}>Insurance 1</MenuItem>
                            <MenuItem value={'Insurance 2'}>Insurance 2</MenuItem>
                            <MenuItem value={'Insurance 3'}>Insurance 3</MenuItem>
                          </Select>
                          {/* <FormHelperText>With label + helper text</FormHelperText> */}
                        </FormControl>
                      </Col>
                    </Row>
                  </Card>
                    {/* <CartItem key={cart.id} item={cart}></CartItem> */}
                    {/* {Object.entries(cart).map(([key, value]) => (
                      <div>
                      <p>{key}</p>
                      <p>{value}</p>
                      </div>
                    ))}      */}
                    {/* <p>{cart.images}</p> */}
              </Col>
              <Col xs={1}/>
              <Col xs={4} className="amount">
              <Row style={{'padding-right':'10px'}}>
                <h5 className="col-6">SUBTOTAL</h5>
                <h5 className="col-6" style={{'text-align':'right'}}>$ {Math.round(cart.price*100)/100}</h5>
              </Row>
              <Row style={{'padding-right':'10px'}}>
                <h5 className="col-6">INSURANCE</h5>
                <h5 className="col-6" style={{'text-align':'right'}}>$ {Math.round(insCost*100)/100}</h5>
              </Row>
              <Row style={{'padding-right':'10px'}}>
                <h5 className="col-6">SHIPPING</h5>
                <h5 className="col-6" style={{'text-align':'right'}}>$$$</h5>
              </Row>
              <Row style={{'padding-right':'10px'}}>
                <h5 className="col-6">TAXES</h5>
                <h5 className="col-6" style={{'text-align':'right'}}>$ {Math.round(cart.price*0.05*100)/100}</h5>
              </Row >
              <hr className="col-12"/>
              <Row style={{'padding-right':'10px'}}>
                <h4 className="col-6">TOTAL</h4>
                <h4 className="col-6" style={{'text-align':'right'}}>$ {Math.round(cart.price*1.05*100)/100}</h4>
              </Row>
              </Col>
            </Row>

          <Row>
            <Col xs={3}>
              <Button
                className="mt-3 mb-3 continue"
                onClick={() => {
                  navigate("/buy");
                }}
              >
                Continue Shopping
              </Button>
            </Col>
            <Col xs={5}/>
            <Col xs={3}>
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
              <Col xs={7}>
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
              <Col />
              <Col xs={4}>
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
              <Col xs={7}>
              <FormControl required className="address">  
                <Row>
                  <Col xs={6}>
                    <TextField
                      sx={{
                        mt: '4vh',
                        // width: '15vw'
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
                  <Col xs={6}>
                    <TextField
                        sx={{
                          mt: '4vh',
                          // width: '15vw'
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
                  <Col xs={6}>
                    <Autocomplete
                      id="country-select"
                      sx={{
                        mt: '4vh',
                        // width: '15vw'
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
                  <Col xs={6}>
                    <TextField
                      className="form-control"
                      sx={{
                        mt: '4vh',
                        // width: '15vw'
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
                  <Col xs={4}>
                    <TextField
                    className="form-control"
                      sx={{
                        mt: '4vh',
                        // width: '15vw'
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
                  <Col xs={3} style={{'margin-right':'0', 'padding-right':'0'}}>
                    <TextField
                      className="form-control"
                      sx={{
                        mt: '4vh',
                        // width: '5vw'
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
                  <Col xs={5}>
                    <TextField
                      sx={{
                        mt: '4vh',
                        // width: '11vw'
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
            <Col xs={1}/>
            <Col xs={4} className="amount">                
              <Card >
                <Row>
                <Col style={{'margin-left':'10px', 'padding':'10px'}}>
                  {/* <Col style={{'padding-left':'30px'}}> */}
                    <img src={cart.images[0].url} style={{'width': '80%' }}></img>
                  </Col>
                  <Col style={{'padding-top':'20px'}}>
                    <h5>{cart.brand}</h5>
                    <h5 >{cart.model}</h5>
                    <h5 >$ {cart.price}</h5>
                  </Col>
                </Row>
              </Card>

              <br/>
              <br/>
              <br/>

              <Row style={{'padding-right':'10px'}}>
                <h5 className="col-6">SUBTOTAL</h5>
                <h5 className="col-6" style={{'text-align':'right'}}>$ {Math.round(cart.price*100)/100}</h5>
              </Row>
              <Row style={{'padding-right':'10px'}}>
                <h5 className="col-6">SHIPPING</h5>
                <h5 className="col-6" style={{'text-align':'right'}}>$$$</h5>
              </Row>
              <Row style={{'padding-right':'10px'}}>
                <h5 className="col-6">TAXES</h5>
                <h5 className="col-6" style={{'text-align':'right'}}>$ {Math.round(cart.price*0.05*100)/100}</h5>
              </Row >
              <hr className="col-12"/>
              <Row style={{'padding-right':'10px'}}>
                <h4 className="col-6">TOTAL</h4>
                <h4 className="col-6" style={{'text-align':'right'}}>$ {Math.round(cart.price*1.05*100)/100}</h4>
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

// const mapStateToProps = (state) => {
//   return {
//     cart: state.shop.cart,
//   };
// };

export default Cart;
