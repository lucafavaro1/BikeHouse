const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// define fields and values that schema should contain
const OrderSchema = new mongoose.Schema(
  {
    buyer: {
      type: [Schema.Types.ObjectId],
      ref: "user",
      required: true,
    },
    listings: {
      type: [Schema.Types.ObjectId],
      ref: "listing",
      required: true,
      default: [],
    },
    accessories: {
      type: [
        {
          id: Schema.Types.ObjectId,
          ref: "accessory",
          quantity: Number,
        },
      ],
      required: true,
      default: [],
    },
    insurance: {
      type: String,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "card",
    },
    // standard or fast
    deliveryType: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
  },
  {
    timestamps: true, // This replaces the timeStamp field we had in the class diagram
  }
);

// name of collection + schema that represents that model
const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;
