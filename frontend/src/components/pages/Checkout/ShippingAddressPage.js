import { Box, Divider, Radio, RadioGroup, Typography } from "@material-ui/core";
import React from "react";
import { TextField, Grid } from "@mui/material";
import { useState } from "react";

function ShippingAddressPage({ setShippingRate }) {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",

    city: "",
    phone: "",
    zip: "",
    country: "",
  });

  const handleChange = (event) => {
    console.log("event target is " + event.target);
    const { name, value } = event.target;
    // console.log(name, value);
    setAddress({ ...address, [name]: value });
  };
  return (
    <>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="firstName"
              onChange={handleChange}
              label="First Name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="lastName"
              label="Last Name"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="addressLine1"
              label="Address line 1"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="addressLine2"
              label="Address line 2"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="zip"
              label="Postal/Zip Code"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="city"
              label="City"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="phone"
              label="Phone"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="country"
              label="Country"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <RadioGroup defaultValue={"freeDelivery"}>
          <div class="row  mt-3 mb-3 ml-2 mr-2">
            <div class="col border border-dark">
              <Radio
                label="Free Delivery"
                value="freeDelivery"
                onClick={() => setShippingRate(0)}
              />
              <span>Free Delivery</span>
              <Typography variant="body2">Standard delivery</Typography>
            </div>
            <div class="col  border border-dark ml-3">
              <Radio
                label="Fast Delivery"
                value="paidDelivery"
                onChange={() => setShippingRate(20)}
              />
              <span>Fast Delivery - </span>
              <Typography variant="body2">
                Delivery within 2 working days
              </Typography>
            </div>
          </div>
        </RadioGroup>
      </form>
    </>
  );
}

export default ShippingAddressPage;
