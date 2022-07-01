const ListingModel = require("../models/Listing");
const { BikeModel } = require("../models/Item");
const UserModel = require("../models/Users");

// @desc Get listings
// @route GET /listing
const getListings = async (req, res) => {
  let listings = await ListingModel.find().exec();
  listings = JSON.parse(JSON.stringify(listings));

  await Promise.all(
    listings.map(async (listing) => {
      // assigning the bike model into a new 'bike' field
      let bike = await BikeModel.findById(listing.bikeId).exec();
      listing.bike = bike;
    })
  );

  listings = listings.sort((a, b) => Number(b.isBoosted) - Number(a.isBoosted));

  return res.status(200).json(listings);
};

// @desc Get a single listing by the id
// @route GET /listing/id
const getListingById = async (req, res) => {
  console.log("Called listing by id");
  var listing;
  let bikeDeets;
  let sellerDeets;
  try {
    listing = await ListingModel.findById(req.params.id).exec();
    bikeDeets = await BikeModel.findById(listing.bikeId).exec();
    sellerDeets = await UserModel.findById(listing.sellerId).exec();
    let listingToSend = {};
    listingToSend["location"] = bikeDeets.location;
    listingToSend["sellerName"] =
      sellerDeets.firstName + " " + sellerDeets.lastName;
    listingToSend["frameVerfied"] = bikeDeets.frameVerified;
    listingToSend["bikeCondition"] = bikeDeets.condition;
    listingToSend["price"] = listing.finalPrice;
    listingToSend["images"] = bikeDeets.photos;
    return res.status(200).json(listingToSend);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Listing not found");
  }

  //   listing.bike = bikeDeets;

  //   let listings = await ListingModel.find().exec();
  //   listings = JSON.parse(JSON.stringify(listings));

  //   await Promise.all(
  //     listings.map(async (listing) => {
  //       // assigning the bike model into a new 'bike' field
  //       let bike = await BikeModel.findById(listing.bikeId).exec();
  //       listing.bike = bike;
  //     })
  //   );

  //   listings = listings.sort((a, b) => Number(b.isBoosted) - Number(a.isBoosted));
};

module.exports = {
  getListings,
  getListingById,
};
