//resuable component function for each shopping cart item

import { Button, Link, Radio, RadioGroup, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../features/cartSlice";
import "../../css/CartItem.css";
import { insuranceOptions } from "../../globals/GlobalObjects";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    marginTop: 15,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
}));

function ShoppingCartItem({
  productKey,
  product,
  handleInsurance,
  handleShipping,
  handleSetQuantity,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const category = product.category;
  const listing = "/listing/" + product.listingId ;
  const id = product.listingId;

  //handle item delete
  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(removeFromCart(id));
  };

  //handle insurance selection
  const handleSelect = (e) => {
    e.preventDefault();
    handleInsurance(productKey, e.target.value);
  };

  //function to display stylized category
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Card className={classes.root}>
      {/* <img src={product.images[0].url}></img> */}
      <CardMedia
        className={classes.cover}
        image={product.images[0].url}
        title={product.brand + " " + product.model}
        // style={{height: 0, width:0, paddingTop: '56.25%'}}
        />
      <CardContent className={classes.content}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {capitalizeFirstLetter(category)}
        </Typography>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h4" component="div">
              {category=="bike" && (
                <a href={listing}>
                  {product.brand + " " + product.model}
                </a>
              )}
              {category=="accessory" && (
                <a href="/accessory">
                  {product.brand + " " + product.model}
                </a>
              )}

            </Typography>
          </Grid>
          <Grid item xs={2} className="cartItem__actions">
            <button onClick={handleRemove} className="actions__deleteItemBtn">
              <DeleteIcon />
            </button>
          </Grid>
        </Grid>
        <Typography variant="subtitle2">
          <hr />
        </Typography>
        <Grid container>
          <Grid item xs={10} sm={9} md={10} lg={10}>
            <Typography
              variant="body1"
              component="div"
              style={{ fontWeight: "bold" }}
            >
              Price Per Item
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6" component="div" color="secondary">
              €{product.price}
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Grid container>
          {category === "accessory" && (
            <>
              <Grid item xs={10} sm={10} md={10} lg={10}>
                <Typography variant="body1" component="div">
                  Quantity
                </Typography>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={product.quantity}
                  onChange={(e) => {
                    e.preventDefault();
                    handleSetQuantity(productKey, e.target.value);
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </Grid>
            </>
          )}
          {category === "bike" && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl>
                <Select
                  value={product.insuranceKey}
                  label="Insurance"
                  variant="outlined"
                  onChange={handleSelect}
                  style={{ marginLeft: 8 + "px" }}
                >
                  {insuranceOptions.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
        <Grid container>
          <RadioGroup value={product.shipping}>
            <div className="row  mt-3 mb-3 ml-2 mr-2">
              <div className="col border border-dark">
                <Radio
                  label="Free Delivery"
                  value={0}
                  onClick={() => {
                    handleShipping(productKey, 0, "Free Delivery");
                  }}
                />
                <span>Free Delivery</span>
                <Typography variant="body2">Standard delivery</Typography>
              </div>
              <div className="col border border-dark ml-3">
                <Radio
                  label="Fast Delivery"
                  value={20}
                  onClick={() => {
                    handleShipping(productKey, 20, "Fast Delivery");
                  }}
                />
                <span>Fast Delivery </span>
                <Typography variant="body2" className="mb-2">
                  Delivery within 2 working days
                </Typography>
              </div>
            </div>
          </RadioGroup>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ShoppingCartItem;
