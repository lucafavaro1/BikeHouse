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
      .post("http://localhost:3001/deleteItemsDB/", {
        bikeId: bikeId,
        listingId: listingId,
      })
      .then((response) => {
        //setIsLoading(false);
        console.log(response);
        navigate("/");
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
    }

    // if the payment was interrupted then delete the item + listing
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- The corresponding listing and item are removed."
      );
      if (query.get("bikeId") != "" && query.get("listingId") != "")
        deleteItemsDB(query.get("bikeId"), query.get("listingId"));
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}

export default Payment;
