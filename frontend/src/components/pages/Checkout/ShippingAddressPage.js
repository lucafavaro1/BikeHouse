// function to render the shipping tab within checkout

import {
  Box,
  Button,
  Divider,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import { TextField, Grid } from "@mui/material";
import "../../css/Checkout.css";
import { useState } from "react";

function ShippingAddressPage({ address, setAddress, handleNavigate }) {
  const [localAddress, setLocalAddress] = useState(address);
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setLocalAddress({ ...localAddress, [name]: value });
  };

  return (
    <div className="checkout">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setAddress(localAddress);
          handleNavigate(1);
        }}
        autoComplete="off"
      >
        <Grid container spacing={2} className="mt-2">
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="firstName"
              onChange={handleChange}
              label="First Name"
              variant="outlined"
              value={localAddress.firstName}
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
              value={localAddress.lastName}
              fullWidth
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              required
              name="streetName"
              label="Street Name"
              variant="outlined"
              onChange={handleChange}
              value={localAddress.streetName}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              name="houseNumber"
              label="House Number"
              variant="outlined"
              type={"number"}
              InputProps={{ inputProps: { min: 1 } }}
              onChange={handleChange}
              value={localAddress.houseNumber}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="addressLine2"
              label="Address line 2"
              variant="outlined"
              onChange={handleChange}
              value={localAddress.addressLine2}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="zip"
              label="Postal/Zip Code"
              variant="outlined"
              onChange={handleChange}
              value={localAddress.zip}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="city"
              label="City"
              variant="outlined"
              onChange={handleChange}
              value={localAddress.city}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="phoneNumber"
              label="Phone"
              variant="outlined"
              onChange={handleChange}
              value={localAddress.phoneNumber}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="country"
              label="Country"
              variant="outlined"
              onChange={handleChange}
              value={localAddress.country}
              fullWidth
            />
          </Grid>
        </Grid>
        <div className="mt-3 mb-3 mr-3 ml-0">
          <Button
            onClick={() => handleNavigate(-1)}
            className="mt-3 mb-3 mr-3 ml-0"
            type="button"
          >
            Back
          </Button>
          <Button className="m-3" type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddressPage;
