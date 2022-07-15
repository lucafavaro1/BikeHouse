import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { CheckBox } from "@mui/icons-material";
import React from "react";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";

function PaymentOptionsPage() {
  // create a Box for the payment options in material-ui with a radio button to select the payment method

  return (
    <>
      <Typography variant="h4">Payment Methods</Typography>
      <Divider />

      <RadioGroup defaultValue={"creditCard"}>
        <div class="row m-3">
          <div class="col-md-12 p-3 border border-dark">
            <Radio label="Credit Card" value="creditCard" />
            <Typography variant="body2">
              Pay using credit card using Stripe, A secure payment gateway
            </Typography>
          </div>
        </div>
      </RadioGroup>
    </>
  );
}

export default PaymentOptionsPage;
