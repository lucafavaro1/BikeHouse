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
  const item = req.body;
  const newItem = new ItemModel.BikeModel(item);
  await newItem.save(); // async request to crease a new user
  res.json(newItem);
};

const createListing = async (req, res) => {
  const listing = req.body;
  const newListing = new ListingModel(listing);
  await newListing.save(); // async request to crease a new user
  res.json(newListing);
};

module.exports = {
  createItem,
  createListing,
  imageUpload,
};
