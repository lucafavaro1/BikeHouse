const mongoose = require("mongoose");

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
  isVerified: Boolean,
});

// name of collection + schema that represents that model
const UserModel = mongoose.model("users_tarlan", UserSchema);

module.exports = UserModel;
