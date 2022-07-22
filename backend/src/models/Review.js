// schema for the review model

const mongoose = require("mongoose");

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

const ReviewModel = mongoose.model("review", ReviewSchema);

module.exports = ReviewModel;
