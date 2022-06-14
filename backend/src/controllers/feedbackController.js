const FeedbackModel = require("../models/Feedback");

// @desc Post feedback
// @route POST /feedback/create

const createFeedback = async (req, res) => {
  const feedback = req.body;
  const newFeedback = new FeedbackModel(feedback);
  await newFeedback.save(); // async request to crease a new feedback
  res.json(newFeedback);
};

module.exports = {
  createFeedback,
};
