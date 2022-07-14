import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DayTimePicker from "@mooncake-dev/react-day-time-picker";
import { Container } from "@mui/system";
import { TextField } from "@mui/material";
import '../css/Cart.css'

const steps = [
  {
    label: `Choose a Delivery Address`,
    description: `Fill delivery address `,
  },
  {
    label: `Review items and delivery`,
    description: `Review order, add extras`,
  },
  {
    label: `Payment Method`,
    description: `Complete the payment process below`,
  },
];

function Cart() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handlePayment = () => {
    alert('pay now')
  };

  return(
    <div className="content cart">
        <Typography
          variant="h3"
          align = 'left'
          sx={{
            m: 2,
            p:2,
            pl:0,
            display: { xs: 'none', md: 'inline' },
            fontFamily: 'monospace',
            fontWeight: 700,
            color: '#2e6076',
            textDecoration: 'none',
            fontSize: 40,
            borderBottom: 3,
            borderColor: 'divider',
          }}
        >
          Shopping Cart
        </Typography>

      <Grid container spacing={2}>
        <Grid item xs={10}>
        <Stepper className="stepper-outer" activeStep={activeStep} orientation="vertical">
              <Step key={steps[0].label}>
                <StepLabel>
                  <Typography
                    variant="h6"
                    sx={{
                      m: 2,
                      p:2,
                      display: { xs: 'none', md: 'inline' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: '#2e6076',
                      textDecoration: 'none',
                      fontSize: 30,
                      borderBottom: 3,
                      borderColor: 'divider',
                    }}
                  >
                    {steps[0].label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography>{steps[0].description}</Typography>
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography>Address Selection goes here</Typography>
                  </Box>
                  <Box>
                    <div>
                      <Button
                        variant="contained"
                        // disabled={isDisabled}
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
              <Step key={steps[1].label}>
                <StepLabel>{steps[1].label}</StepLabel>
                <StepContent>
                  <Typography>{steps[1].description}</Typography>
                  <Card sx={{ m: 1, p: 1 }}>
                    <Typography>Review goes here</Typography>
                  </Card>
                  <Box sx={{ mt: 2 }}>
                    <div>
                      <Button
                        sx={{ ml: 1 }}
                        variant="contained"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                      <Button sx={{ ml: 1 }} onClick={handleBack}>
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
              <Step key={steps[2].label}>
                <StepLabel>{steps[2].label}</StepLabel>
                <StepContent>
                  <Typography>{steps[2].description}</Typography>
                  <Card sx={{ m: 1, p: 1 }}>
                    <Typography>Payment Method goes here</Typography>
                  </Card>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <div>
                      <Button
                        sx={{ mr: 1 }}
                        variant="contained"
                        onClick={handlePayment}
                      >
                        Pay Now
                      </Button>
                      <Button sx={{ mr: 1 }} onClick={handleBack}>
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>

        </Grid>
        <Grid item xs={2}>
          <Card>Order Summary goes here</Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cart;
