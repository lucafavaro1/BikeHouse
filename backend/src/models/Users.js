const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// define fields and values that schema should contain
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  billingAddress: {
    type: Schema.Types.ObjectId,
    ref: "address",
    required: false,
    default: "62a8d2db92f7dccf6e401015",
  },
  isVerified: Boolean,
});

// name of collection + schema that represents that model
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
