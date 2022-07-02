import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Payment() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  const handleSubmit = async () => {
    await Axios.post("http://localhost:3001/create-checkout-session")
    // navigate(resp.url)
  }

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

      {/* <button onClick={handleSubmit}> SUBMIT </button> */}

      <form action="http://localhost:3001/create-checkout-session" method="POST">
        <button type="submit">
          Checkout
        </button>
      </form>

    </section>
  );

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}

export default Payment;
