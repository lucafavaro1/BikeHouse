"use strict";
require("dotenv").config();

// Configuration variables
const port = process.env.PORT || "3001";
const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://kevin:kevin123@cluster0.rzghy.mongodb.net/BikeHouse?retryWrites=true&w=majority";
//const JwtSecret = process.env.JWT_SECRET || "very secret secret";

module.exports = {
  port,
  mongoURI,
  //JwtSecret,
};
