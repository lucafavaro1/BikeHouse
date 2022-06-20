const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors"); // connect API to frontend
const config = require("./src/config");
// const middlewares = require('./middlewares')

const api = express();

api.use(express.json({ limit: "50mb" }));
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

api.use("/", require("./src/routes/userRoutes"));
api.use("/", require("./src/routes/feedbackRoutes"));

server.on("listening", () => {
  console.log(`Server running port ${config.port}`);
});

server.on("error", (err) => {
  console.log("Error in the server", err.message);
  process.exit(err.statusCode);
});
