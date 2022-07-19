import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import {
  Autocomplete,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import "../../css/CartItem.css";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../features/cartSlice";
import FormControl from "@mui/material/FormControl";
import { Row } from "react-bootstrap";
import Switch from "@mui/material/Switch";
import { Box, Divider, Radio, RadioGroup, Typography } from "@material-ui/core";
import { insuranceOptions } from "../globals/GlobalObjects";

const useStyles = makeStyles((theme) => ({
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
  key,
  productKey,
  product,
  handleInsurance,
  handleShipping,
  handleSetQuantity,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const category = product.category;
  const id = product.listingId;

  // const [checked, setChecked] = useState(false);
  // const handleChange = (event) => {
  //   event.preventDefault()
  //   setChecked(event.target.checked);
  // };

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(removeFromCart(id));
  };

  const handleSelect = (e) => {
    e.preventDefault();
    handleInsurance(productKey, e.target.value);
  };

  // useEffect(() => {
  //   }, [insurance]);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={product.images[0].url}
        title={product.brand + " " + product.model}
      />
      <CardContent className={classes.content}>
        {/* <CardMedia
          className={classes.cover}
          image="https://source.unsplash.com/random"
          title="Live from space album cover"
        /> */}
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {category}
        </Typography>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="div" component="h2">
              {product.brand + " " + product.model}
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
          {category == "accessory" && (
            <>
              <Grid item xs={11} sm={11} md={11} lg={11}>
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
          {category == "bike" && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {/* <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              /> */}
              <FormControl>
                <Select
                  value={product.insuranceKey}
                  // disabled={!checked}
                  label="Insurance"
                  variant="outlined"
                  onChange={handleSelect}
                  // onClose
                  // onClick
                  // onSelect
                  // autoFocus = {false}
                  // onFocus
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
            <div class="row  mt-3 mb-3 ml-2 mr-2">
              <div class="col border border-dark">
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
              <div class="col  border border-dark ml-3">
                <Radio
                  label="Fast Delivery"
                  value={20}
                  onClick={() => {
                    handleShipping(productKey, 20, "Fast Delivery");
                  }}
                />
                <span>Fast Delivery - </span>
                <Typography variant="body2">
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
