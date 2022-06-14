const mongoose = require("mongoose");

// define fields and values that schema should contain
const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

// name of collection + schema that represents that model
const ReviewModel = mongoose.model("review", ReviewSchema);

module.exports = ReviewModel;
