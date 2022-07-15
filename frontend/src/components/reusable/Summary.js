import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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

export default function Summary({ products, shippingRate }) {
  const classes = useStyles();
  const subTotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    shippingRate
  );

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
        <Typography variant="div" component="h4">
          {" "}
          Order Summary
        </Typography>
        <Typography variant="subtitle2">
          <hr />
        </Typography>
        <Grid container>
          <Grid item xs={10} sm={10} md={11} lg={10}>
            <Typography variant="body1" component="div">
              Sub total
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography variant="h6" component="div">
              €{subTotal}
            </Typography>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <Typography variant="body1" component="div">
              Shipping
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography variant="h6" component="div">
              {shippingRate}
            </Typography>
          </Grid>
          <Grid item xs={10} sm={10} md={11} lg={10}>
            <Typography variant="body1" component="div">
              Total
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography variant="h6" component="div">
              €{totalPrice}
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
