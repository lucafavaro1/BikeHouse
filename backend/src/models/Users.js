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
    default: "62a8d2db92f7dccf6e401015",
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
  rating: {
    oneStar: { type: Number, default: 0 },
    twoStars: { type: Number, default: 0 },
    threeStars: { type: Number, default: 0 },
    fourStars: { type: Number, default: 0 },
    fiveStars: { type: Number, default: 0 },
  },
  averageRating: {
    type: mongoose.Types.Decimal128,
    default: 0.0,
  },
});

// name of collection + schema that represents that model
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
