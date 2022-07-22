import emailjs from "@emailjs/browser";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@material-ui/core";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Button, Rating } from "@mui/material";
import Axios from "axios";
import { Promise } from "bluebird";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeAllElementsFromTheCart } from "../../features/cartSlice";
import emailkey from "../../features/emailKeys";
import { selectUser, AUTH_TOKENS } from "../../features/userSlice";
import "../css/OrderSummary.css";
import AxiosJWT from "../utils/AxiosJWT";

function OrderSummary(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(selectUser);
  const [value, setValue] = useState(0);
  const [order, setOrder] = useState({});
  const [listings, setListings] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [address, setAddress] = useState({});
  const [show, setShow] = useState(false);
  const [currentListing, setCurrentListing] = useState(""); // for feedbacks
  const [currentSeller, setCurrentSeller] = useState(""); // for feedbacks
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = (listing) => {
    setShow(true);
    setCurrentSeller(listing.sellerId);
    setCurrentListing(listing._id);
  };

  /** Returns an order instance where foreign keys are replaced with actual objects */
  async function getOrder() {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    try {
      setIsLoading(true);
      const response = await AxiosJWT.get("http://localhost:3001/order/" + id, {
        headers: {
          authorization: "Bearer " + authTokens.accessToken,
        },
      });
      setOrder(response.data);
      setListings(response.data.listingObjects);
      setAccessories(response.data.accessoryObjects);
      setAddress(response.data.addressObject);
      setIsLoading(false);
      if (props.showThankYou) {
        listingToInactive(response.data.listingObjects);
        moveCredit(response.data);
        sendEmail(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(removeAllElementsFromTheCart());
    getOrder();
  }, []);

  /** Renders a new list component for each listing */
  const renderListing = (listing, index) => {
    return (
      <li className="list-group-item listingListItem" key={index}>
        <div className="row">
          <div className="col-3 text-center">
            <img className="itemImage" src={listing.bike.photos[0].url}></img>
          </div>
          <div className="col">
            <div className="row">
              <div className="col-9 p-0">
                <strong className="text-uppercase">
                  {listing.bike.brand} {listing.bike.model}
                </strong>
              </div>

              <div className="col-3 p-0">
                {!listing.feedback ? (
                  <>
                    <Button
                      className="starButton"
                      variant="outlined"
                      onClick={() => {
                        handleOpen(listing);
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          color: "#2e6076",
                          paddingLeft: 5 + "px",
                          paddingRight: 5 + "px",
                        }}
                      >
                        Submit a review
                      </span>
                      <StarRateIcon fontSize="big" className="starIcon" />
                    </Button>
                  </>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            {/* Ends here */}
            <div className="row">&euro; {listing.finalPrice}</div>

            <div className="row mt-4">
              <strong>Insurance:&nbsp;</strong>
              {listing.insuranceName} (&euro;{listing.insurancePrice})
            </div>

            <div className="row text-capitalize">
              <strong>Shipping:&nbsp;</strong>
              {listing.deliveryType} (&euro;{listing.deliveryPrice})
            </div>
          </div>
        </div>
      </li>
    );
  };

  /** Renders a new list component for each accessory */
  const renderAccessory = (accessory, index) => {
    return (
      <li className="list-group-item listingListItem" key={index}>
        <div className="row">
          <div className="col-3 text-center">
            <img className="itemImage" src={accessory.photos[0].url}></img>
          </div>
          <div className="col">
            <div className="row">
              <strong className="text-uppercase">
                {accessory.brand} {accessory.name}
              </strong>
            </div>

            <div className="row">
              &euro; {accessory.price * accessory.quantity}
            </div>

            <div className="row text-capitalize mt-5">
              <strong>Quantity:&nbsp;</strong>
              {accessory.quantity}
            </div>
          </div>
        </div>
      </li>
    );
  };

  const listingToInactive = async (allListings) => {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    setIsLoading(true);
    await Promise.all(
      allListings.map(async (listing) => {
        try {
          await AxiosJWT.post("http://localhost:3001/modifyListing/", {
            headers: {
              authorization: "Bearer " + authTokens.accessToken,
            },
            listingId: listing._id,
            isActive: false,
          });
        } catch (error) {
          console.log(error);
        }
      })
    );
    setIsLoading(false);
  };

  const moveCredit = async (order) => {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    const allListingObjects = order.listingObjects;
    setIsLoading(true);
    // use a special Promise map function to avoid parallelism
    // otherwise if you bought two bikes from the same seller the balance is not updated correctly because they run in parallel
    await Promise.map(
      allListingObjects,
      async function (listing) {
        try {
          await AxiosJWT.post("http://localhost:3001/moveCreditToSeller/", {
            headers: {
              authorization: "Bearer " + authTokens.accessToken,
            },
            sellerId: listing.sellerId,
            credit: listing.bike.price,
          });
        } catch (error) {
          console.log(error);
        }
      },
      { concurrency: 1 }
    );
    setIsLoading(false);
  };

  function sendEmail(data) {
    emailjs.init(emailkey.USER_ID);
    let date = moment(data.createdAt).format("DD-MM-YYYY HH:mm");
    emailjs
      .send(emailkey.SERVICE_ID, emailkey.TEMPLATE_ID_ORDER, {
        order_id: id,
        name: user.name,
        order_date: date,
        email: user.email,
        address_firstname: data.addressObject.firstName,
        address_lastname: data.addressObject.lastName,
        address_streetname: data.addressObject.streetName,
        address_housenumber: data.addressObject.houseNumber,
        address_city: data.addressObject.city,
        address_country: data.addressObject.country,
        address_zip: data.addressObject.zip,
        order_totalamount: data.totalAmount,
      })
      .then(
        (result) => {},
        (error) => {
          alert("An error occurred, Please try again", error.text);
        }
      );
  }

  const submitRating = async () => {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    try {
      await AxiosJWT.post("http://localhost:3001/updateUser/", {
        headers: {
          authorization: "Bearer " + authTokens.accessToken,
        },
        userId: currentSeller,
        value: value,
      });
      await AxiosJWT.post("http://localhost:3001/updateOrder", {
        headers: {
          authorization: "Bearer " + authTokens.accessToken,
        },
        orderId: id,
        listingId: currentListing,
        feedback: true,
      });
      const response = await AxiosJWT.get("http://localhost:3001/order/" + id, {
        headers: {
          authorization: "Bearer " + authTokens.accessToken,
        },
      });
      setOrder(response.data);
      setListings(response.data.listingObjects);
      setAccessories(response.data.accessoryObjects);
      setAddress(response.data.addressObject);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ marginTop: 200 + "px" }}>
        <Modal.Header>
          <Modal.Title>Drop a feedback to the seller!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please leave a feedback to the seller of this bike. Consider in
          particular:
          <ul>
            <li>Declared condition vs Actual condition</li>
            <li>Price fairness</li>
            <li>Completeness in the description/photo</li>
          </ul>
          <Row
            style={{
              justifyContent: "center",
            }}
          >
            <Rating
              name="simple-controlled"
              value={value}
              sx={{ color: "#2e6076" }}
              size="large"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            sx={{
              backgroundColor: "#2e6076",
              color: "white",
              ":hover": { color: "black", backgroundColor: "gold" },
            }}
            onClick={submitRating}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
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
        <>
          <div className="orderSummary">
            {props.showThankYou ? (
              <div className="thankYou">
                <div className="row justify-content-center">
                  <FontAwesomeIcon icon={faCircleCheck} color="#4dbd60" />
                </div>
                <div className="row mt-3 justify-content-center">
                  <h1>Thank you!</h1>
                </div>
                <div className="row mt-1 justify-content-center">
                  <span>
                    Your order has been placed. You can see the details below...
                  </span>
                </div>
                <hr></hr>
              </div>
            ) : (
              <p></p>
            )}

            <div>
              <Row className="main">
                <div className="col-1"></div>
                <div className="col-8 listingsGroup">
                  <p className="orderInfoText">
                    <strong>Order date: </strong>
                    <span className="orderInfoTextSmall">
                      {new Date(order.createdAt).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </p>

                  <div className="orderInfoText">
                    <strong>Order ID: </strong>
                    <span className="orderInfoTextSmall">{id}</span>
                    <p></p>
                  </div>

                  <div className="orderInfoText">
                    <strong>Delivery address: </strong>
                    <p className="orderInfoTextSmall">
                      {address.firstName} {address.lastName}
                      <br></br>
                      {address.streetName} {address.houseNumber}
                      <br></br>
                      {address.city}, {address.country}
                      <br></br>
                      {address.zip}
                    </p>
                  </div>

                  <ul className="list-group">
                    {listings.map(renderListing)}
                    {accessories.map(renderAccessory)}
                  </ul>

                  <p className="orderInfoText mt-4 mb-0 text-right">
                    <strong>Total amount: </strong>
                    &euro; {order.totalAmount}
                  </p>
                </div>
                <div className="col-1 m-0 p-0">
                  <Modal.Dialog style={{ width: 130 + "%" }}>
                    <Modal.Title style={{ textAlign: "center", color: "gold" }}>
                      &#9733;
                    </Modal.Title>
                    <Modal.Body
                      style={{
                        fontSize: 13,
                        padding: 5 + "px",
                        textAlign: "center",
                      }}
                    >
                      <p>
                        <b>Your opinion matters! </b>
                      </p>
                      <p>Give a feedback to the bike sellers.</p>
                    </Modal.Body>
                  </Modal.Dialog>
                </div>
              </Row>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrderSummary;
