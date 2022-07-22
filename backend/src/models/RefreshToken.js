// schema for the refresh token

const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
});

const RefreshTokenModel = mongoose.model("refreshtoken", RefreshTokenSchema);

module.exports = RefreshTokenModel;
