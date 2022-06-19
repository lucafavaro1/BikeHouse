const mongoose = require("mongoose");

const parentClassOptions = { 
  discriminatorKey: 'kind'
 };

// fields that the parent schema should contain
const ItemSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, parentClassOptions);

// fields that the bike schema should contain
const BikeSchema = new mongoose.Schema({
  frameSize: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  condition: {
    type: Number,
    required: true
  },
  frameVerified: {
    type: Boolean,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photos: {
    type: [String],
    required: true
  },
  frontGears: {
    type: Number,
    required: true
  },
  rearGears: {
    type: Number,
    required: true
  },
  brakeType: {
    type: String,
    required: true
  },
  frameMaterial: {
    type: String,
    required: true
  }
  // sellerId: {  // I THINK WE SHOULD HAVE IT INSIDE THE LISTING MODEL ONLY
  //   type: Schema.Types.ObjectId,
  //   required: true
  // }
});

// fields that the accessory schema should contain
const AccessorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// name of collection + schema that represents that model + options defining the parent class
const ItemModel = mongoose.model("item", ItemSchema)
const BikeModel = ItemModel.discriminator("bike", BikeSchema)
const AccessoryModel = ItemModel.discriminator("accessory", AccessorySchema)

module.exports = {
  ItemModel,
  BikeModel,
  AccessoryModel
}