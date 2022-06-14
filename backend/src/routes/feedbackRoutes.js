const express = require("express");
const router = express.Router();

const {
  createFeedback
} = require("../controllers/feedbackController");

router.post("/createFeedback", createFeedback);


module.exports = router;
