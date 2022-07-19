import React, { useState, useEffect, useRef } from "react";
import "../css/OrderSummary.css";
import Axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

function OrderSummary(props) {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [listings, setListings] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [address, setAddress] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  /** Returns an order instance where foreign keys are replaced with actual objects */
  async function getOrder() {
    try {
      setIsLoading(true);
      const response = await Axios.get("http://localhost:3001/order/" + id);
      setOrder(response.data);
      setListings(response.data.listingObjects);
      setAccessories(response.data.accessoryObjects);
      setAddress(response.data.addressObject);
      setIsLoading(false);
      if (props.showThankYou) {
        listingToInactive(response.data.listingObjects);
        moveCredit();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrder();
  }, []);

  /** Renders a new list component for each listing */
  const renderListing = (listing, index) => {
    return (
      <li className="list-group-item disabled listingListItem" key={index}>
        <div className="row">
          <div className="col-3 text-center">
            <img className="itemImage" src={listing.bike.photos[0].url}></img>
          </div>
          <div className="col">
            <div className="row">
              <strong className="text-uppercase">
                {listing.bike.brand} {listing.bike.model}
              </strong>
            </div>

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
      <li className="list-group-item disabled listingListItem" key={index}>
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
    setIsLoading(true);
    await Promise.all(
      allListings.map(async (listing) => {
        try {
          await Axios.post("http://localhost:3001/modifyListing/", {
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

  const moveCredit = async () => {};

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
        <>
          <div className="orderSummary content">
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
              <span></span>
            )}

            <div>
              <div className="row p-0 m-0 justify-content-center">
                <div class="col-7 listingsGroup">
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrderSummary;
