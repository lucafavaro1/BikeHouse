import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  const ProductDisplay = () => (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>

      <form
        action="http://localhost:3001/create-checkout-session"
        method="POST"
      >
        <button type="submit">Checkout</button>
      </form>
    </section>
  );

  const deleteItemsDB = async (bikeId, listingId) => {
    await axios
      .delete("http://localhost:3001/deleteListing/" + listingId)
      .catch((error) => {
        console.log(error);
      });

    await axios
      .delete("http://localhost:3001/deleteBike/" + bikeId)
      .then((response) => {
        navigate("/dashboard/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETE ORDER
  const deleteOrder = async (orderId) => {
    // await axios
    //   .delete("http://localhost:3001/deleteListing/")
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // await axios
    //   .delete("http://localhost:3001/deleteBike/")
    //   .then((response) => {
    //     navigate("/dashboard/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const modifyListing = async (listingId) => {
    await axios
      .post("http://localhost:3001/modifyListing/", {
        listingId: listingId,
        isBoosted: true,
      })
      .then((response) => {
        //setIsLoading(false);
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
      setMessage("Order placed! You will receive an email confirmation.");
      if (query.get("listingId") != "") modifyListing(query.get("listingId"));

      if (query.get("listingId") != "")
        navigate("/listing/" + query.get("listingId"));
    }

    // if the payment was interrupted then delete the item + listing
    if (query.get("canceled")) {
      if (query.get("bikeId") != null && query.get("listingId") != null)
        deleteItemsDB(query.get("bikeId"), query.get("listingId"));

      if (query.get("listingId") != "")
        navigate("/listing/" + query.get("listingId"));

      if (query.get("orderId") != "") deleteOrder(query.get("orderId"));
    } else navigate("/");
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}

export default Payment;
