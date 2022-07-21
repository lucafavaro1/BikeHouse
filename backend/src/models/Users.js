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
    unique: true,
    required: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  billingAddress: {
    type: Schema.Types.ObjectId,
    ref: "address",
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationPictures: [
    {
      id: String,
      src: Buffer,
      url: String,
      name: String,
    },
  ],
  averageRating: {
    avg: {
      type: mongoose.Types.Decimal128,
      default: 0.0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

// name of collection + schema that represents that model
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
