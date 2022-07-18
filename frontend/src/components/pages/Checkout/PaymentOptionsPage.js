import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import { CheckBox } from "@mui/icons-material";
import React from "react";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import "../../css/Checkout.css";
import axios from "axios";

function PaymentOptionsPage({
  handleNavigate,
  address,
  products,
  user,
  totalPrice,
}) {
  // create a Box for the payment options in material-ui with a radio button to select the payment method

  const payBasket = async (orderId) => {
    console.log("paybasket called with orderId", orderId);
    await axios
      .post("http://localhost:3001/checkout-basket/", {
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

  const createOrder = async () => {
    console.log("create order");
    let listingsFromTheCarts = [];
    let accessoriesFromTheCarts = [];

    for (let i = 0; i < products.length; i++) {
      const prod = products[i];

      //TODO get the category from prod
      if (prod.category === "accessory") {
        console.log("Prod category is Accessory");
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
    console.log("orderObjectToSend is ", orderObjectToSend);
    try {
      const orderObject = await axios.post(
        "http://localhost:3001/api/createOrder",
        orderObjectToSend
      );
      payBasket(orderObject.data._id);
      return orderObject.data;
    } catch (err) {
      console.log(err);
    }
  };

  const doPayment = async (e) => {
    e.preventDefault();

    const orderCreated = await createOrder(products, address);
    console.log(orderCreated);
  };
  return (
    <div className="checkout">
      <Typography variant="h4">Payment Methods</Typography>
      <Divider />

      <RadioGroup defaultValue={"creditCard"}>
        <div class="row m-3">
          <div class="col-md-12 p-3 border border-dark">
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
