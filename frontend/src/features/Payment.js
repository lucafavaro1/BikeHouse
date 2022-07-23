//functions to implement payment features

import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  //function to delete item in DB if payment failed
  const deleteItemsDB = async (bikeId, listingId) => {
    await axios
      .delete("http://localhost:3001/deleteListing/" + listingId)
      .catch((error) => {
        console.log(error);
      });

    await axios
      .delete("http://localhost:3001/deleteBike/" + bikeId)
      .then(() => {
        navigate("/dashboard/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //function to delete order if payment failed
  const deleteOrder = async (orderId) => {
    await axios
      .delete("http://localhost:3001/deleteOrder/" + orderId)
      .then(() => {
        alert("Order cancelled! The payment was not successful");
        navigate("/dashboard/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //function to modify listing on ad boosting payment success
  const modifyListing = async (listingId) => {
    await axios
      .post("http://localhost:3001/modifyListing/", {
        listingId: listingId,
        isBoosted: true,
      })
      .then((response) => {
        console.log(response);
        navigate("/dashboard/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      if (query.get("listingId") !== "") modifyListing(query.get("listingId"));

      if (query.get("listingId") !== "")
        navigate("/listing/" + query.get("listingId"));
    }

    // if the payment was interrupted then delete the item + listing
    if (query.get("canceled")) {
      if (query.get("bikeId") !== null && query.get("listingId") !== null)
        deleteItemsDB(query.get("bikeId"), query.get("listingId"));

      if (query.get("listingId") !== "")
        navigate("/listing/" + query.get("listingId"));

      if (query.get("orderId") !== null) deleteOrder(query.get("orderId"));
    } else navigate("/");
  }, []);
}

export default Payment;
