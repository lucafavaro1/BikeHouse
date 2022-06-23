"use strict";

// Configuration variables
require('dotenv').config()
const port = process.env.PORT || "3001";
const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://kevin:kevin123@cluster0.rzghy.mongodb.net/BikeHouse?retryWrites=true&w=majority";
//const JwtSecret = process.env.JWT_SECRET || "very secret secret";
const sgMail = require('@sendgrid/mail')

const SENDGRID_API_KEY = process.env.REACT_APP_SENDGRID_API_KEY || "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";

module.exports = {
  port,
  mongoURI,
  SENDGRID_API_KEY
  //JwtSecret,
};
