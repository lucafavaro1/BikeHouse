// route to create appointment 
// @route /createAppointment

const express = require("express");
const router = express.Router();

const {
  createAppointment
} = require("../controllers/appointmentController");

router.post("/createAppointment", createAppointment);


module.exports = router;
