import React, { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Specialist.css";
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
import { timeSlotValidator, createICS } from "../../features/slotPicker";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";
import { TextField } from "@mui/material";
import Login from "./Login";
import { Navigate } from "react-router-dom";

const steps = [
  {
    label: `Describe your Issue`,
    description: `What consultation can we help you with? 
        Describe in a few lines`,
  },
  {
    label: `Pick a Date and Time Slot`,
    description: `Choose a date and time of your convenience.
      We will take care of the meeting arrangements! `,
  },
  {
    label: `Payment`,
    description: `Complete the payment process below`,
  },
];

function Specialist() {
  // require('dotenv').config();
  const user = useSelector(selectUser);
  const sender = {
    email: "bikehouse.feedback@gmail.com",
    name: "BikeHouse Specialist",
  };
  const subject = "BikeHouse Invitation";
  const [issue, setIssue] = useState("");

  const [cal, setCal] = useState("");

  const handleSchedule = (event) => {
    setCal(createICS(event, user));
    handleNext();
  };

  const [isDisabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    setIssue(event.target.value);
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
    }).then((response) => {
      console.log(response.data.message);

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
                        value={issue}
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
                  invite.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  sx={{ mt: 1, ml: 4 }}
                >
                  Book another appointment
                </Button>
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
