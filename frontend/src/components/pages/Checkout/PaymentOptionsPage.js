// function to load the payment tab within checkout

import { Button, Divider, Typography } from "@material-ui/core";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import React from "react";
import { AUTH_TOKENS } from "../../../features/userSlice";
import "../../css/Checkout.css";
import AxiosJWT from "../../utils/AxiosJWT";

function PaymentOptionsPage({
  handleNavigate,
  address,
  products,
  user,
  totalPrice,
}) {
  // create a Box for the payment options in material-ui with a radio button to select the payment method

  //function to trigger payment
  const payBasket = async (orderId) => {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    await AxiosJWT.post("http://localhost:3001/checkout-basket/", {
      headers: {
        authorization: "Bearer " + authTokens.accessToken,
      },
      orderId: orderId,
      successLink: "/orderSuccess/" + orderId,
      cancelLink: "/checkout/?canceled=true" + "&" + "orderId=" + orderId,
    })
      .then((response) => {
        window.location = response.data.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //function to create an order item and call payment trigger
  const createOrder = async () => {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }

    let listingsFromTheCarts = [];
    let accessoriesFromTheCarts = [];

    for (let i = 0; i < products.length; i++) {
      const prod = products[i];

      //TODO get the category from prod
      if (prod.category === "accessory") {
        const accessoryForOrder = {
          id: prod.listingId,
          quantity: prod.quantity,
          deliveryType: prod.deliveryType,
          deliveryPrice: prod.shipping,
        };
        accessoriesFromTheCarts.push(accessoryForOrder);
      } else {
        const bikeForOrder = {
          id: prod.listingId,
          insuranceName: prod.insuranceName,
          insurancePrice: prod.insurance,
          deliveryType: prod.deliveryType,
          deliveryPrice: prod.shipping,
        };
        listingsFromTheCarts.push(bikeForOrder);
      }
    }
    const orderObjectToSend = {
      buyer: user.userId,
      listings: listingsFromTheCarts,
      accessories: accessoriesFromTheCarts,
      paymentMethod: "card",
      deliveryAddress: address,
      totalAmount: totalPrice,
    };
    try {
      const orderObject = await AxiosJWT.post(
        "http://localhost:3001/api/createOrder",
        {
          headers: {
            authorization: "Bearer " + authTokens.accessToken,
          },
          ...orderObjectToSend,
        }
      );
      payBasket(orderObject.data._id);
      return orderObject.data;
    } catch (err) {
      console.log(err);
    }
  };

  //function to handle payment button click
  const doPayment = async (e) => {
    e.preventDefault();

    await createOrder(products, address);
  };
  return (
    <div className="checkout">
      <Typography variant="h4">Payment Methods</Typography>
      <Divider />

      <RadioGroup defaultValue={"creditCard"}>
        <div className="row m-3">
          <div className="col-md-12 p-3 border border-dark">
            <Radio label="Credit Card" value="creditCard" />
            <Typography variant="body2">
              Pay using credit card using Stripe, A secure payment gateway
            </Typography>
          </div>
        </div>
      </RadioGroup>
      <div className="align-self-end">
        <Button
          onClick={() => handleNavigate(-1)}
          className="m-3"
          type="button"
        >
          Back
        </Button>
        <Button
          onClick={doPayment}
          style={{ width: 200 + "px", marginLeft: 20 + "px" }}
          type="button"
        >
          Complete Payment
        </Button>
      </div>
    </div>
  );
}

export default PaymentOptionsPage;
