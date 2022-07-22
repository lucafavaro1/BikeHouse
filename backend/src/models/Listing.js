//schema for listing model

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ListingSchema = new mongoose.Schema(
  {
    isBoosted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      ref: "bike",
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    finalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // This replaces the timeStamp field we had in the class diagram
  }
);

const ListingModel = mongoose.model("listing", ListingSchema);

module.exports = ListingModel;
