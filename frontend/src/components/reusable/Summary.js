import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function Summary({ products, setTotalPrice }) {
  const useStyles = makeStyles({
    root: {
      position: "sticky",
      top: "1rem",
      minWidth: "275",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const classes = useStyles();
  let subTotal;

  subTotal = products.reduce((acc, product) => {
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
    <Card className={classes.root} elevation={15}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
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

      {/* <CardActions>
        <Button size="large" color="secondary">
          BUY NOW ({1})
        </Button>
      </CardActions> */}
    </Card>
  );
}
