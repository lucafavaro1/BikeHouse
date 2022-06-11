const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors"); // connect API to frontend

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://luca:luca123@cluster0.rzghy.mongodb.net/BikeHouse?retryWrites=true&w=majority"
);

app.use("/", require("./routes/userRoutes"));

app.listen(3001, () => {
  console.log("Server Runs!");
});
