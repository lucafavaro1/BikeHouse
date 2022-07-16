import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const payBasket = async (orderId) => {
  await axios
    .post("http://localhost:3001/checkout-basket/", {
      orderId: orderId,
      successLink: "/order/" + orderId,
      cancelLink: "/",
      // dont use the following one until everything works, it will cancel the order!!
      //   cancelLink: "/checkout/?canceled=true" + "&" + "orderId=" + orderId,
    })
    .then((response) => {
      window.location = response.data.url;
    })
    .catch((error) => {
      console.log(error);
    });
};

function Temporary() {
  const bothBikesAndAccessories = "62d280a9d15c77a410b2d964";
  const onlyAccessories = "62d2a9cfe5c24a1cd8199df3";
  const onlyBikes = "62d2aaa1e5c24a1cd8199df8";
  return <Button onClick={() => payBasket(onlyBikes)}>Go to checkout</Button>;
}

export default Temporary;
