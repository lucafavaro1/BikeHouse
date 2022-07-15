import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Autocomplete, FormControlLabel, IconButton, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import '../../css/CartItem.css'
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {removeFromCart} from "../../../features/cartSlice";
import FormControl from '@mui/material/FormControl';
import { Box } from "@mui/system";
import { Row } from "react-bootstrap";

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

const options = [
  {
    label: 'No Insurance Selected',
    value: 0
  },
  {
    label: 'GetSafe - €40/year ',
    value: 40
  },
  {
    label: 'Feather - €30/year',
    value: 30
  },
  {
    label: 'Qover - €25/year',
    value: 25
  },
]

function ShoppingCartItem({ key, productKey, product, handleInsurance }) {
  const classes = useStyles();
  const category = 'Bike'
  const [insurance,setInsurance] =  useState(10)
  const dispatch = useDispatch();
  const id = product.listingId;
  const handleRemove = (e) => {
    e.preventDefault();
    console.log("id in handle", id)
    dispatch(removeFromCart(id))
  } 
  const handleSelect = (e) => {
    // e.preventDefault()
    handleInsurance(productKey,e.target.value); 
    setInsurance(e.target.value)
  }
  
  // useEffect(()=> {
  //   setInsurance(insurance)
  // }, [handleSelect]);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={product.images[0].url}
        title="Live from space album cover"
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
          <Grid item xs={10 }>
            <Typography variant="div" component="h2">
              {product.brand + ' ' + product.model}
            </Typography>
          </Grid>
          <Grid item xs={2} className='cartItem__actions'>
            <button
              onClick={handleRemove}
              className='actions__deleteItemBtn'
            >
              <DeleteIcon/>
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
          {category =="Accessory" && (
            <>
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Typography variant="body1" component="div">
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1}>
              <Typography variant="h6" component="div">
                {product.quantity}
              </Typography>
            </Grid>
            </>
          )}
          {category == "Bike" && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Autocomplete
                options={options}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose an insurance"
                  />
                  )}
                onChange={(event, value) => {
                  setInsurance(value.label)
                }}
              />
            </Grid>
          )}

        </Grid>
      </CardContent>
    </Card>
  );
}

export default ShoppingCartItem;
