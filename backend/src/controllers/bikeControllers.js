const ItemModel = require("../models/Item");
const ListingModel = require("../models/Listing");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dddfwnt4q",
  api_key: "425483745239159",
  api_secret: "du6Q0cnP3TnEQVtP85YKSpkWXqg",
});

const imageUpload = async (req, res) => {
  const values = req.body.photos;
  const promises = values.map((image) =>
    cloudinary.uploader.upload(image.src, function (error, result) {})
  );

  Promise.all(promises).then((results) => res.json(results));
};

const createItem = async (req, res) => {
  console.log("create item called");
  const item = req.body;
  const newItem = new ItemModel.BikeModel(item);
  await newItem.save(); // async request to crease a new user
  res.json(newItem);
};

const createListing = async (req, res) => {
  console.log("create listing called");
  const listing = req.body;
  const newListing = new ListingModel(listing);
  await newListing.save(); // async request to crease a new user
  res.json(newListing);
};

const deleteItemsDB = async (req, res) => {
  // if the payment was interrupted then delete the item + listing
  console.log("deleteItemsDB called");
  await ItemModel.BikeModel.findByIdAndDelete(req.body.bikeId);
  await ListingModel.findByIdAndDelete(req.body.listingId);
  res.json("ok");
};

module.exports = {
  createItem,
  createListing,
  imageUpload,
  deleteItemsDB,
};
