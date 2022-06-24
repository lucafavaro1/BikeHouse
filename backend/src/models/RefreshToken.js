const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const RefreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
});

const RefreshTokenModel = mongoose.model("refreshtoken", RefreshTokenSchema);

module.exports = RefreshTokenModel;
