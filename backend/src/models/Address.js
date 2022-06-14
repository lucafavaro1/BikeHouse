const mongoose = require("mongoose");

// define fields and values that schema should contain
const AddressSchema = new mongoose.Schema({
  streetName: {
    type: String,
    required: true
  },
  houseNumber: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  }
});

// name of collection + schema that represents that model
const AddressModel = mongoose.model("address", AddressSchema);

module.exports = AddressModel;
