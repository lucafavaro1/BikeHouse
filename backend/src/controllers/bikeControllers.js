const ItemModel = require("../models/Item");
const ListingModel = require("../models/Listing");

const createItem = async (req, res) => {
  console.log("create item claled");
  const item = req.body;
  const newItem = new ItemModel.BikeModel(item);
  await newItem.save(); // async request to crease a new user
  res.json(newItem);
};

const createListing = async (req, res) => {
  console.log("create lisint claled");
  const listing = req.body;
  const newListing = new ListingModel(listing);
  await newListing.save(); // async request to crease a new user
  res.json(newListing);
};

module.exports = {
  createItem,
  createListing,
};
