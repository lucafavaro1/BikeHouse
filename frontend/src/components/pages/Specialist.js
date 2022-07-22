import DayTimePicker from "@mooncake-dev/react-day-time-picker";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { createICS, timeSlotValidator } from "../../features/slotPicker";
import { AUTH_TOKENS, selectUser } from "../../features/userSlice";
import "../css/Specialist.css";
import AxiosJWT from "../utils/AxiosJWT";
import Login from "./Login";

const steps = [
  {
    label: `Describe your request`,
    description: `What consultation can we help you with? 
        Describe in a few lines`,
  },
  {
    label: `Pick a Date and Time Slot`,
    description: `Choose a date and time of your convenience.
      We will take care of the meeting arrangements! `,
  },
  {
    label: `Payment - 20€ flat fee for 30 minutes`,
    description: `Complete the payment process below`,
  },
];

const paySpecialist = async () => {
  let authTokens = localStorage.getItem(AUTH_TOKENS);
  if (authTokens != null) {
    authTokens = JSON.parse(authTokens);
  } else {
    console.log("Auth Tokens is null");
  }

  await AxiosJWT.post("http://localhost:3001/checkout-boost-specialist/", {
    headers: {
      authorization: "Bearer " + authTokens.accessToken,
    },
    name: "Specialist appointment ⏰",
    price: 20,
    successLink: "/dashboard",
    cancelLink: "/",
    // image:
    //   "https://www.clipartmax.com/png/small/204-2041203_rocket-cartoon-animation-spacecraft-vector-of-rocket.png",
  })
    .then((response) => {
      window.location = response.data.url;
      //navigate(-1);
    })
    .catch((error) => {
      console.log(error);
    });
};

function Specialist() {
  // require('dotenv').config();
  const user = useSelector(selectUser);
  const sender = {
    email: "bikehouse.feedback@gmail.com",
    name: "BikeHouse Specialist",
  };
  const subject = "BikeHouse Specialist Appointment";
  const [request, setRequest] = useState("");

  const [cal, setCal] = useState("");

  const handleSchedule = (event) => {
    setCal(createICS(event, user));
    handleNext();
  };

  const [isDisabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    setRequest(event.target.value);
    setDisabled(false);
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinish = () => {
    // console.log(user)
    // console.log(cal.toString())
    // console.log(typeof cal)
    sendEmail(user, cal);
    handleNext();
    paySpecialist();
  };

  const themeCalendar = {
    primary: "#306070",
    secondary: "#306070",
    background: "white", // This should match the container background
    buttons: {
      disabled: {
        color: "#333",
        background: "#f0f0f0",
      },
      confirm: {
        color: "white",
        background: "white",
        hover: {
          color: "",
          background: "white",
        },
      },
    },
  };

  const sendEmail = (user, cal) => {
    Axios.post("http://localhost:3001/createAppointment", {
      sender,
      user,
      subject,
      cal,
    })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container
      className="content specialist"
      sx={{
        mt: 5,
      }}
      justifyContent="center"
    >
      {user ? (
        <>
          <Typography variant="h3" align="center">
            Book an Appointment
          </Typography>
          <Typography variant="h6" align="center" justifyContent="center">
            Schedule an appointment with a BikeHouse expert to solve your
            doubts. <br />
            We will help you find your dream bike!
          </Typography>
          <Container
            maxWidth="sm"
            sx={{
              mt: 5,
            }}
            justifyContent="center"
          >
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step key={steps[0].label}>
                <StepLabel>{steps[0].label}</StepLabel>
                <StepContent>
                  <Typography>{steps[0].description}</Typography>
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <FormControl fullWidth required>
                      {/* <InputLabel>Additional Comments</InputLabel> */}
                      <TextField
                        // sx={{mt: 2}}
                        id="filled-basic"
                        label="Additional Comments"
                        value={request}
                        variant="outlined"
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <div>
                      <Button
                        variant="contained"
                        disabled={isDisabled}
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
                    <DayTimePicker
                      id="calendar"
                      timeSlotSizeMinutes={60}
                      timeSlotValidator={timeSlotValidator}
                      onConfirm={handleSchedule}
                      theme={themeCalendar}
                    />
                  </Card>
                  <Box sx={{ mt: 2 }}>
                    <div>
                      <Button
                        sx={{ ml: 1 }}
                        variant="contained"
                        disabled
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
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <div>
                      <Button
                        sx={{ mr: 1 }}
                        variant="contained"
                        onClick={handleFinish}
                      >
                        Finish
                      </Button>
                      <Button sx={{ mr: 1 }} onClick={handleBack}>
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
            {activeStep === steps.length && (
              <>
                <Typography sx={{ ml: 4 }}>
                  Your appointment has been successfully scheduled. <br />
                  Check your email for a confirmation message and a calendar
                  invite. Wait until you get redirected to the payment page.
                </Typography>
              </>
            )}
          </Container>
        </>
      ) : (
        <Login />
      )}
    </Container>
  );
}

export default Specialist;
