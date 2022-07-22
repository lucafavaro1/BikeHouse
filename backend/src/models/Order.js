// schema for order model

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    listings: {
      type: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: "listing",
          },
          insuranceName: {
            type: String,
            required: true,
            default: "none",
          },
          insurancePrice: {
            type: Number,
            required: true,
            default: 0,
          },
          // standard or fast
          deliveryType: {
            type: String,
            required: true,
            default: "standard",
          },
          deliveryPrice: {
            type: Number,
            required: true,
            default: 0,
          },
          deliveryPrice: {
            type: Number,
            required: true,
            default: 0,
          },
          feedback: {
            type: Boolean,
            required: true,
            default: false,
          },
        },
      ],
      required: true,
      default: [],
    },
    accessories: {
      type: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: "accessory",
          },
          quantity: Number,
          deliveryType: {
            type: String,
            default: "standard",
          },
          deliveryPrice: {
            type: Number,
            default: 0,
          },
        },
      ],
      required: true,
      default: [],
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

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;
