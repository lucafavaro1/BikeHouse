import Axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import "../css/Dashboard.css";
import { Button, Divider, Toolbar } from "@mui/material";
import rocketIcon from "../pictures/rocket.png";
import underVerificationIcon from "../pictures/under_verification.png";
import LogoutIcon from "@mui/icons-material/Logout";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { login, logout } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, AUTH_TOKENS } from "../../features/userSlice";
import {
  Row,
  Col,
  Card,
  Form,
  Carousel,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import DropBox from "../../features/Dropbox";
import ShowImage from "../../features/ShowImage";
import userIcon from "../pictures/user_icon.png";
import ListingDescription from "./ListingDescription";
import moment from "moment";
import Stars from "react-stars-display";
import { removeAllElementsFromTheCart } from "../../features/cartSlice";
import AxiosJWT from "../utils/AxiosJWT";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [value, setValue] = useState(0);
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [titleVerify, setTitleVerify] = useState("Verify Now");
  const [textVerify, setTextVerify] = useState(
    "Verified sellers are statistically more likely to sell their bikes faster through our website by being featured before unverified listings."
  );
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    getListings();
    getOrdersByBuyer();

    if (user.verificationPictures.length !== 0) {
      setTitleVerify("Documents uploaded");
      setTextVerify(
        "Thanks for submitting your documents, our team will verify your profile shortly. This procedure can take up to a couple of working days."
      );
    }
  }, []);

  function ErrorMessage({ message }) {
    return <div className="alert alert-danger">{message}</div>;
  }

  async function getListings() {
    setIsLoading(true);
    try {
      const response = await Axios.get(
        "http://localhost:3001/listingsBySeller/" + user.userId
      );
      if (response.data !== "You have no listings") setListings(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function getOrdersByBuyer() {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    setIsLoading(true);
    try {
      const response = await AxiosJWT.get(
        "http://localhost:3001/getOrdersByBuyer/" + user.userId,
        {
          headers: {
            authorization: "Bearer " + authTokens.accessToken,
          },
        }
      );
      if (response.data !== "You have no orders") {
        setOrders(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  function changePassword() {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    setIsLoading(true);
    // send to backend the old + password
    AxiosJWT.post(`http://localhost:3001/updatePassword`, {
      headers: {
        authorization: "Bearer " + authTokens.accessToken,
      },
      email: user.email,
      password,
      newPassword,
    })
      .then((res) => {
        alert("Password successfully changed");
        window.location.reload(false);
      })
      .catch((error) => {
        setErrorMessage("An error occur, check the current password");
        console.log(error);
      });
    setIsLoading(false);
  }

  function retrieveListing() {
    return listings.length === 0 ? (
      <div>
        <p></p>
        <p>
          Currently you have: <b>{listings.length} active listings</b>
        </p>
      </div>
    ) : (
      <div className="listings">
        <p>
          Currently you have: <b>{listings.length} active listings</b>{" "}
        </p>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          indicators={false}
          prevLabel={null}
          nextLabel={null}
        >
          {listings.map((listing) => (
            <Carousel.Item>
              <img
                alt="bike pic"
                className="d-block w-100"
                src={listing.bike.photos[0].url}
                onClick={() => navigate("/listing/" + listing._id)}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }

  function displayOrders() {
    return orders.length === 0 ? (
      <div>
        <p></p>
        <p>
          You have <b>{orders.length} completed orders. </b>
        </p>
      </div>
    ) : (
      <div className="orders">
        <p>
          You have <b>{orders.length} completed orders. </b>
        </p>
        <div className="scollOrdersDashboard">
          <ListGroup as="ol">
            {orders.map((order) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start py-2 mb-0"
                onClick={() => navigate("/order/" + order._id)}
              >
                <div style={{ fontSize: 16 + "px" }} className="ms-2 me-auto">
                  {moment(order.createdAt).format("DD/MM/YYYY")}
                </div>
                <Badge bg="warning" pill>
                  {order.totalAmount} €
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }

  const renderCard = (listing, index) => {
    return (
      <Card key={index} onClick={() => navigate("/listing/" + listing._id)}>
        <Card.Img variant="top" src={listing.bike.photos[0].url} />

        {listing.isBoosted ? (
          <div>
            <img src={rocketIcon} className="boostIcon" />
          </div>
        ) : (
          <span></span>
        )}

        {listing.bike.conditionToBeVerified ||
        listing.bike.frameToBeVerified ? (
          <div>
            <img src={underVerificationIcon} className="boostIcon" />
          </div>
        ) : (
          <span></span>
        )}

        <Card.Body>
          <Card.Text>
            <ListingDescription listing={listing}></ListingDescription>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setPhotos((prevState) => [
          ...prevState,
          {
            id: index,
            src: reader.result,
            name: file.name,
          },
        ]);
      };
      return file;
    });
  }, []);

  const lists = photos.map((list) => (
    <div>
      <li key={list.id}>{list.name}</li>
    </div>
  ));

  const uploadImages = () => {
    Axios.post(`http://localhost:3001/image-upload`, {
      photos,
    })
      .then((res) => {
        console.log(res);
        var copyPhoto = [...photos];
        for (let i = 0; i < copyPhoto.length; i++) {
          copyPhoto[i].url = res.data[i].url;
          copyPhoto[i].src = null;
        }
        setPhotos(copyPhoto);
        submitVerification();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitVerification = async () => {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    setIsLoading(true);
    await AxiosJWT.post("http://localhost:3001/userVerification", {
      headers: {
        authorization: "Bearer " + authTokens.accessToken,
      },
      user: user.userId,
      photos,
    })
      .then((res) => {
        console.log(`Photo added for the verification`);
        logoutAndLogin();
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  const logoutAndLogin = async () => {
    let email = user.email;

    dispatch(logout());
    dispatch(removeAllElementsFromTheCart());

    const response = await Axios.post("http://localhost:3001/loginUser/", {
      email,
      password,
    });
    console.log(response);
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
    window.location.reload(false);
  };

  function totalNumberOfItems(order) {
    let numItems = order.listings.length;
    order.accessories.map(
      (oneAccessory) => (numItems = numItems + oneAccessory.quantity)
    );
    return numItems;
  }

  const zeroCredit = async (userId) => {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    setIsLoading(true);
    try {
      await AxiosJWT.post("http://localhost:3001/zeroCredit/", {
        headers: {
          authorization: "Bearer " + authTokens.accessToken,
        },
        userId: userId,
      }).then(() => {
        logoutAndLogin();
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(removeAllElementsFromTheCart());
    navigate("/");
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
        <div className="dashboard">
          <Row className="box">
            <Col md="auto">
              <Stack sx={{ borderRight: 1, borderColor: "divider" }}>
                <Typography
                  variant="h6"
                  sx={{
                    m: 2,
                    p: 2,
                    display: { xs: "none", md: "inline" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#2e6076",
                    textDecoration: "none",
                    fontSize: 30,
                    borderBottom: 3,
                    borderColor: "divider",
                  }}
                >
                  My Dashboard
                </Typography>
                <Tabs
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                >
                  <Tab label="Account" />
                  <Tab label="My listings" />
                  <Tab label="Orders History" />
                  <Tab label="Support" />
                  <Tab disabled label="" />
                  <Tab disabled label="" />
                  <Tab disabled label="" />
                  <Tab disabled label="" />
                </Tabs>
                <Toolbar
                  sx={{ m: 2, p: 2, borderBottom: 3, borderColor: "divider" }}
                />

                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  wid
                  endIcon={<LogoutIcon sx={{ display: "flex" }} />}
                  sx={{
                    m: 2,
                    mx: "auto",
                    p: 2,
                    width: "fit-content",
                    alignItems: "flex-center",
                    color: "#2e6076",
                    display: "flex",
                    fontSize: "small",
                    fontWeight: "bold",
                    borderColor: "#2e6076",
                    ":hover": { color: "#2e6076" },
                  }}
                >
                  Sign Out
                </Button>
              </Stack>
            </Col>
            <Divider />
            <Col>
              <TabPanel value={value} index={0}>
                <Row>
                  <Col>
                    <Typography
                      variant="h6"
                      sx={{
                        m: 1,
                        p: 1,
                        display: { xs: "none", md: "inline" },
                        fontFamily: "monospace",
                        textDecoration: "none",
                        fontSize: 20,
                        borderBottom: 3,
                        borderColor: "divider",
                      }}
                    >
                      My Profile
                    </Typography>
                    <div className="row profile">
                      <Col md={4}>
                        {" "}
                        <img alt="user icon" src={userIcon} />
                      </Col>
                      <Col md={7} className="info mr-0 pr-0">
                        {" "}
                        <p>{user.name + " " + user.surname}</p>
                        <p>{moment(user.birthdate).format("DD-MM-YYYY")}</p>
                        <p>{user.email}</p>
                        <p>
                          {user.billingAddress.streetName +
                            " " +
                            user.billingAddress.houseNumber +
                            " , " +
                            user.billingAddress.city}
                        </p>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setValue(5);
                            setErrorMessage("");
                          }}
                          sx={{
                            color: "white",
                            backgroundColor: "#2e6076",
                            borderColor: "#2e6076",
                            ":hover": {
                              backgroundColor: "gold",
                              color: "black",
                            },
                          }}
                        >
                          {" "}
                          Change Password
                        </Button>
                      </Col>
                      <Col md={1}></Col>
                    </div>
                  </Col>
                  <Col>
                    {user.averageRating.avg.$numberDecimal == 0 ? (
                      <p>
                        <u>
                          You dont have any review, start selling/buying now
                        </u>
                      </p>
                    ) : (
                      <div style={{ marginBottom: 10 + "px" }}>
                        Your rating:
                        <Stars
                          stars={user.averageRating.avg.$numberDecimal}
                          size={30}
                          spacing={2}
                          fill="#2e6076"
                        />
                      </div>
                    )}
                    {user.isVerified ? (
                      <Button
                        variant="outlined"
                        endIcon={<CheckCircleIcon sx={{ display: "flex" }} />}
                        sx={{
                          mx: "auto",
                          mb: "20px",
                          mt: "20px",
                          color: "white",
                          backgroundColor: "green",
                          borderColor: "#2e6076",
                          ":hover": {
                            color: "white",
                            backgroundColor: "green",
                          },
                        }}
                      >
                        {" "}
                        You are verified!{" "}
                      </Button>
                    ) : (
                      <div className="row">
                        <p></p>
                        <Col md={10} className="verify">
                          {user.verificationPictures.length !== 0 ? (
                            <Button
                              variant="outlined"
                              endIcon={
                                <HourglassBottomIcon sx={{ display: "flex" }} />
                              }
                              sx={{
                                mx: "auto",
                                mb: "20px",
                                mt: "20px",
                                color: "black",
                                backgroundColor: "gold",
                                borderColor: "#2e6076",
                                ":hover": {
                                  color: "black",
                                  backgroundColor: "gold",
                                },
                              }}
                            >
                              {titleVerify}
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              endIcon={
                                <GppMaybeIcon sx={{ display: "flex" }} />
                              }
                              onClick={() => {
                                setValue(4);
                              }}
                              sx={{
                                mx: "auto",
                                mb: "20px",
                                mt: "20px",
                                color: "white",
                                backgroundColor: "red",
                                borderColor: "#2e6076",
                                ":hover": { color: "red", borderColor: "red" },
                              }}
                            >
                              {titleVerify}
                            </Button>
                          )}
                          <p>{textVerify}</p>
                        </Col>
                        <Col md={2}></Col>
                      </div>
                    )}

                    {user.balance != 0 ? (
                      <>
                        <Row>
                          <p className="col-5 p-0 mt-2">
                            Please enter your password, then click Redeem:{" "}
                          </p>
                          <input
                            type="password"
                            className="form-control col-3 mt-2"
                            placeholder="Password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </Row>
                        <p></p>
                        <div className="row balance">
                          <div className="col-5 p-0">
                            <p style={{ alignContent: "center", margin: 0 }}>
                              Balance: {user.balance} €{" "}
                            </p>
                          </div>
                          <Button
                            variant="contained"
                            style={{
                              marginTop: -5 + "px",
                              backgroundColor: "#2e6076",
                            }}
                            onClick={() => {
                              if (password != "") {
                                alert("You successfully redeemed your credit.");
                                zeroCredit(user.userId);
                              }
                            }}
                          >
                            {" "}
                            Redeem
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="row balance mt-4">
                        <div className="col-5 p-0">
                          <p style={{ alignContent: "center", margin: 0 }}>
                            Balance: {user.balance} €{" "}
                          </p>
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 + "px" }}>
                  <Col>
                    <Typography
                      variant="h6"
                      sx={{
                        m: 1,
                        p: 1,
                        display: { xs: "none", md: "inline" },
                        fontFamily: "monospace",
                        textDecoration: "none",
                        fontSize: 20,
                        borderBottom: 3,
                        borderColor: "divider",
                        cursor: "pointer",
                      }}
                    >
                      <a onClick={() => setValue(1)}>My Listings</a>
                    </Typography>
                    {retrieveListing()}
                  </Col>
                  <Col>
                    <Typography
                      variant="h6"
                      sx={{
                        m: 1,
                        p: 1,
                        display: { xs: "none", md: "inline" },
                        fontFamily: "monospace",
                        textDecoration: "none",
                        fontSize: 20,
                        borderBottom: 3,
                        borderColor: "divider",
                        cursor: "pointer",
                        maxHeight: 100 + "px",
                      }}
                    >
                      <a onClick={() => setValue(2)}>Orders History</a>
                    </Typography>
                    {displayOrders()}
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel value={value} index={1}>
                {listings.length == 0 ? (
                  <div>
                    <h3>You have no active listings at the moment !</h3>
                    <p>After uploading a new listing you will find it here.</p>
                  </div>
                ) : (
                  <Row xs={3} md={4}>
                    {listings.map(renderCard)}
                  </Row>
                )}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {orders.length == 0 ? (
                  <div>
                    <h3>Your orders history is empty! </h3>
                    <p> After placing the first order you will find it here.</p>
                  </div>
                ) : (
                  <>
                    <p>
                      You have <b>{orders.length} completed orders. </b>
                    </p>
                    <div className="ordersPanel">
                      <ListGroup as="ol" numbered>
                        {orders.map((order) => (
                          <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start py-2 mb-0"
                            onClick={() => navigate("/order/" + order._id)}
                          >
                            <div
                              style={{ fontSize: 16 + "px" }}
                              className="row ms-2 me-auto"
                            >
                              <div className="col-9 elements">
                                <b>OrderID: {order._id} </b>
                                <p>
                                  Date :{" "}
                                  {moment(order.createdAt).format("DD/MM/YYYY")}{" "}
                                </p>
                                <p>
                                  {" "}
                                  Number of items: {totalNumberOfItems(order)}
                                </p>
                                <p>Payment method: {order.paymentMethod}</p>
                                <p></p>
                                <p style={{ marginTop: 15 + "px" }}>
                                  Total Amount: {order.totalAmount} €{" "}
                                </p>
                              </div>
                              <div className="col-3">
                                <Button
                                  variant="contained"
                                  sx={{
                                    color: "white",
                                    backgroundColor: "#2e6076",
                                    borderColor: "#2e6076",
                                    ":hover": {
                                      backgroundColor: "gold",
                                      color: "black",
                                    },
                                  }}
                                  onClick={() =>
                                    navigate("/order/" + order._id)
                                  }
                                >
                                  More details
                                </Button>
                              </div>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  </>
                )}
              </TabPanel>
              <TabPanel value={value} index={3}>
                <h2>Need help ? Contact us! </h2>
                <p></p>
                <ul>
                  <li>
                    {" "}
                    Email:{" "}
                    <a
                      href="" // just to make it blue
                      onClick={() =>
                        (window.location =
                          "mailto:bikehouse.feedback@gmail.com")
                      }
                    >
                      bikehouse.feedback@gmail.com
                    </a>
                  </li>
                  <li>
                    {" "}
                    Telephone:{" "}
                    <a href="tel: +49 1234 567890">+49 1234 567890</a>
                  </li>
                  <li>
                    {" "}
                    Form <a href="/contact">here </a>
                  </li>
                </ul>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div className="verification">
                  <h1> Verify your Profile</h1>
                  <hr></hr>
                  <p className="description">
                    Verified sellers are statistically more likely to sell their
                    bikes faster through our website by being featured before
                    unverified listings.
                  </p>
                  <p>
                    Please upload a scan of one of your ID documents and a
                    selfie
                  </p>
                  <b>ID Type:</b>{" "}
                  <Form.Select aria-label="Default select example" required>
                    <option>Choose one</option>
                    <option value="1">ID Card</option>
                    <option value="2">Passport</option>
                  </Form.Select>
                  <div className="dragndrop">
                    <DropBox onDrop={onDrop} />
                    <aside>
                      <h5>Uploaded pictures:</h5>
                      <p>{lists}</p>
                    </aside>
                    <ShowImage images={photos} />
                    {errorMessage.length > 0 ? (
                      <ErrorMessage message={errorMessage} />
                    ) : (
                      <p></p>
                    )}
                  </div>
                  <Row>
                    <p className="col-6">
                      Please enter your password to submit the documents:{" "}
                    </p>
                    <input
                      type="password"
                      className="form-control col-3"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Row>
                  <Row>
                    <Button
                      href="/dashboard"
                      className="col mt-3 mb-3 custom"
                      variant="secondary"
                    >
                      {" "}
                      Cancel{" "}
                    </Button>
                    <p className="col mt-3 mb-3"></p>
                    <p className="col mt-3 mb-3"></p>
                    <p className="col mt-3 mb-3"></p>
                    <Button
                      onClick={() => {
                        if (photos.length == 0)
                          setErrorMessage(
                            "Please upload the ID picture and the selfie"
                          );
                        else uploadImages();
                      }}
                      className="col mt-3 mb-3 submit"
                      variant="secondary"
                    >
                      {" "}
                      Submit{" "}
                    </Button>
                  </Row>
                </div>
              </TabPanel>
              <TabPanel value={value} index={5}>
                <div className="verification">
                  <h3>Change password </h3>
                  <p>
                    {" "}
                    Please fill in the form below to change the current password
                  </p>
                  <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                      <form onSubmit={changePassword}>
                        <input
                          required
                          type="password"
                          name="currentpassword"
                          className="form-control mt-3 mb-3"
                          placeholder="Current password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                        <input
                          required
                          type="password"
                          id="newPassword"
                          className="form-control mt-3 mb-3"
                          placeholder="New password"
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                        />
                        <input
                          required
                          type="password"
                          id="repeatNewPassword"
                          className="form-control mt-3 mb-3"
                          placeholder="Repeat new password"
                        />
                      </form>
                      {errorMessage.length > 0 ? (
                        <ErrorMessage message={errorMessage} />
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <div className="col-3"></div>
                  </div>
                  <Row>
                    <Button
                      href="/dashboard"
                      className="col mt-3 mb-3 custom"
                      variant="secondary"
                    >
                      {" "}
                      Cancel{" "}
                    </Button>
                    <p className="col mt-3 mb-3"></p>
                    <p className="col mt-3 mb-3"></p>
                    <p className="col mt-3 mb-3"></p>
                    <Button
                      onClick={() => {
                        if (
                          document.getElementById("newPassword").value !=
                          document.getElementById("repeatNewPassword").value
                        )
                          setErrorMessage("The new password does not match");
                        else changePassword();
                      }}
                      className="col mt-3 mb-3 submit"
                      variant="secondary"
                    >
                      {" "}
                      Submit{" "}
                    </Button>
                  </Row>
                </div>
              </TabPanel>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default Dashboard;
