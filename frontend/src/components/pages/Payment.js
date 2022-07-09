import React, { useState, useEffect } from "react";

function Payment() {
  const [message, setMessage] = useState("");
  const [another, setAnother] = useState(0);

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
        <button type="submit" onClick={setAnother(1)}>
          Checkout
        </button>
      </form>
    </section>
  );

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("Another is: " + another);
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
