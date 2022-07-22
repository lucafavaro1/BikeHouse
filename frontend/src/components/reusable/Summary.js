import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { removeAllElementsFromTheCart } from "../../features/cartSlice";

function Summary({
  products,
  setTotalPrice,
  showNextButton,
  nextPageNavigationHandler,
  showDeleteButton,
}) {
  const dispatch = useDispatch();

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

  const resetBasket = () => {
    dispatch(removeAllElementsFromTheCart());
  };

  return (
    <Card
      style={{ position: "sticky", top: "6rem", minWidth: "275" }}
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
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography variant="body1" component="div">
              Sub total
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} style={{ textAlign: "right" }}>
            <Typography variant="h6" component="div">
              €{" "}
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 2,
              }).format(subTotal)}
            </Typography>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <Typography variant="body1" component="div">
              Insurance
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} style={{ textAlign: "right" }}>
            <Typography variant="h6" component="div">
              €
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 2,
              }).format(insuranceTotal)}
            </Typography>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <Typography variant="body1" component="div">
              Shipping
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} style={{ textAlign: "right" }}>
            <Typography variant="h6" component="div">
              €{" "}
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 2,
              }).format(shippingTotal)}
            </Typography>
          </Grid>

          <Grid item xs={7} sm={7} md={7} lg={7}>
            <hr></hr>

            <Typography variant="h6" component="div">
              Total
            </Typography>
          </Grid>
          <hr />
          <Grid item xs={5} sm={5} md={5} lg={5} style={{ textAlign: "right" }}>
            <hr></hr>

            <Typography variant="h6" component="div">
              €{" "}
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 2,
              }).format(totalPrice)}
            </Typography>
          </Grid>

          {showDeleteButton && (
            <Button
              type="button"
              onClick={resetBasket}
              style={{
                width: "40%",
                margin: "5% 5% 0% 0%",
                display: "inline-block",
                backgroundColor: "rgb(209, 15, 15)",
              }}
            >
              Clear All
            </Button>
          )}

          {showNextButton && (
            <Button
              type="button"
              onClick={() => {
                nextPageNavigationHandler(1);
              }}
              style={{
                width: "55%",
                margin: "5% 0% 0% 0%",
                display: "inline-block",
              }}
            >
              Next
            </Button>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Summary;
