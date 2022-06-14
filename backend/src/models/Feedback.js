const mongoose = require("mongoose");

// define fields and values that schema should contain
const FeedbackSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// name of collection + schema that represents that model
const FeedbackModel = mongoose.model("feedback", FeedbackSchema);

module.exports = FeedbackModel;
