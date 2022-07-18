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
import { useState } from "react";

function ShippingAddressPage({ address, setAddress, handleNavigate }) {
  const [localAddress, setLocalAddress] = useState(address);
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // console.log(name, value);
    setLocalAddress({ ...localAddress, [name]: value });
    // setAddress(localAddress);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setAddress(localAddress);
          handleNavigate(1);
        }}
        autoComplete="off"
      >
        <Grid container spacing={2}>
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
              name="houseNumber"
              label="House Number"
              variant="outlined"
              type={"number"}
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
              name="country"
              label="Country"
              variant="outlined"
              onChange={handleChange}
              value={localAddress.country}
              fullWidth
            />
          </Grid>
        </Grid>
        {/* <RadioGroup defaultValue={"freeDelivery"}>
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
        </RadioGroup> */}
        <div className="m-3">
          <Button
            className="m-3"
            style={{ backgroundColor: "#2e6076", color: "white" }}
            type="submit"
          >
            Next
          </Button>
          <Button
            onClick={() => handleNavigate(-1)}
            className="m-3"
            style={{ backgroundColor: "#2e6076", color: "white" }}
            type="button"
          >
            Back
          </Button>
        </div>
      </form>
    </>
  );
}

export default ShippingAddressPage;
