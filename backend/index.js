const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const sgMail = require('@sendgrid/mail')
const cors = require("cors"); // connect API to frontend
const config = require("./src/config");
// const middlewares = require('./middlewares')

const api = express();

api.use(express.json());
api.use(cors());
api.set("port", config.port);
const server = http.createServer(api);

mongoose
  .connect(config.mongoURI)
  .then(() => server.listen(config.port))
  .catch((err) => {
    console.log("Error connecting to the database", err.message);
    process.exit(err.statusCode);
  });

// sgMail
//   .setApiKey(config.SENDGRID_API_KEY)

// const msg = {
//   to: 'kevingeother@gmail.com', // Change to your recipient
//   from: 'bikehouse.feedback@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

api.use("/", require("./src/routes/userRoutes"));
api.use("/", require("./src/routes/feedbackRoutes"));
api.use("/", require("./src/routes/appointmentRoutes"));

server.on("listening", () => {
  console.log(`Server running port ${config.port}`);
});

server.on("error", (err) => {
  console.log("Error in the server", err.message);
  process.exit(err.statusCode);
});
