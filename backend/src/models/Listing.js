const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// define fields and values that schema should contain
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
    shouldBeVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // This replaces the timeStamp field we had in the class diagram
  }
);

// name of collection + schema that represents that model
const ListingModel = mongoose.model("listing", ListingSchema);

module.exports = ListingModel;
