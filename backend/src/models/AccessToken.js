const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const AccessTokenSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
    unique: true,
  },
});

const AccessTokenModel = mongoose.model("accesstoken", AccessTokenSchema);

module.exports = AccessTokenModel;
