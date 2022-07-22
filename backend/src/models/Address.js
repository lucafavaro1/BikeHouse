//schema for address model

const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  streetName: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: "Germany",
  },
  zip: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
});

const AddressModel = mongoose.model("address", AddressSchema);

module.exports = AddressModel;
