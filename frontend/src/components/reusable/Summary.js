// resuable component function to define and style Summary card from cart 

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";

function Summary({ products, setTotalPrice }) {
  const subTotal = products.reduce((acc, product) => {
    if (product.quantity) {
      return acc + product.quantity * product.price;
    } else {
      return acc + product.price;
    }
  }, 0);

  const insuranceTotal = products.reduce(
    (acc, product) => acc + product.insurance,
    0
  );
  const shippingTotal = products.reduce((acc, product) => {
    if (product.quantity) {
      return acc + product.quantity * product.shipping;
    } else {
      return acc + product.shipping;
    }
  }, 0);
  const totalPrice = subTotal + insuranceTotal + shippingTotal;
  setTotalPrice(totalPrice);

  return (
    <Card
      style={{ position: "sticky", top: "1rem", minWidth: "275" }}
      elevation={15}
    >
      <CardContent>
        <Typography style={{ fontSize: 14 }} color="textSecondary" gutterBottom>
          Shopping Cart
        </Typography>
        <Typography variant="h5" component="div">
          {" "}
          Order Summary
        </Typography>
        <Typography variant="subtitle2">
          <hr />
        </Typography>
        <Grid container>
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <Typography variant="body1" component="div">
              Sub total
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} style={{ textAlign: "right" }}>
            <Typography variant="h6" component="div">
              € {subTotal}
            </Typography>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <Typography variant="body1" component="div">
              Insurance
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} style={{ textAlign: "right" }}>
            <Typography variant="h6" component="div">
              € {insuranceTotal}
            </Typography>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <Typography variant="body1" component="div">
              Shipping
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} style={{ textAlign: "right" }}>
            <Typography variant="h6" component="div">
              € {shippingTotal}
            </Typography>
          </Grid>

          <Grid item xs={7} sm={7} md={7} lg={7}>
            <hr></hr>

            <Typography variant="h5" component="div">
              Total
            </Typography>
          </Grid>
          <hr />
          <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right" }}>
            <hr></hr>

            <Typography variant="h5" component="div">
              € {totalPrice}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Summary;
