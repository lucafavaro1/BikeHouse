const ListingModel = require("../models/Listing");
const { BikeModel } = require("../models/Item");
const UserModel = require("../models/Users");

// @desc Get listings
// @route GET /listing
const getListings = async (req, res) => {
  const perPage = 6;
  var page = req.query.page || 0;
  var sortingCriterion = req.query.sortingCriterion

  console.log();
  console.log("RAW QUERY:");
  console.log(req.query);

  let listingFilters = generateListingFilters(req.query);
  let bikeFilters = generateBikeFilters(req.query);

  console.log("GENERATED LISTING FILTER: ");
  console.log(listingFilters);
  console.log("GENERATED BIKE FILTER: ");
  console.log(bikeFilters);

  let listings = await ListingModel.find(listingFilters) // fetch listings
    .limit(perPage)
    .skip(perPage * page)
    .sort({ isBoosted: -1 })
    .exec();

  listings = JSON.parse(JSON.stringify(listings)); // convert to JSON to support adding a new field (bike)

  listings = await fetchBikesForListings(listings, bikeFilters);

  listings = sortListings(listings, sortingCriterion)

  return res.status(200).json(listings);
};

function sortListings(listings, criterion) {
  listings.sort(function (listing1, listing2) {
    if (listing1.isBoosted && !listing2.isBoosted) return -1;
    else if (!listing1.isBoosted && listing2.isBoosted) return 1;

    else { // both boosted
      if (criterion == 'default') {
        if (listing1.bike.condition > listing2.bike.condition) return -1;
        else if (listing1.bike.condition < listing2.bike.condition) return 1

        else { // both boosted + same condition
          if (new Date(listing1.createdAt) > new Date(listing2.createdAt)) return -1;
          else if (new Date(listing1.createdAt) < new Date(listing2.createdAt)) return 1
        }
      }
      else if (criterion == "priceLH") {
        if (listing1.finalPrice > listing2.finalPrice) return 1;
        else if (listing1.finalPrice < listing2.finalPrice) return -1
      }
      else if (criterion == "priceHL") {
        if (listing1.finalPrice > listing2.finalPrice) return -1;
        else if (listing1.finalPrice < listing2.finalPrice) return 1

      }
    }

    return 0
  });

  return listings
}

function generateBikeFilters(rawQuery) {
  var filter = {};

  if (rawQuery.minFrameSize) {
    filter.frameSize = filter.frameSize || {};
    filter.frameSize.$gte = rawQuery.minFrameSize;
  }

  if (rawQuery.maxFrameSize) {
    filter.frameSize = filter.frameSize || {};
    filter.frameSize.$lte = rawQuery.maxFrameSize;
  }

  if (rawQuery.colors) {
    filter.color = filter.color || {};
    filter.color.$in = rawQuery.colors;
  }

  if (rawQuery.gender) {
    filter.gender = filter.gender || {};
    filter.gender = rawQuery.gender;
  }

  if (rawQuery.conditions) {
    filter.condition = filter.condition || {};
    filter.condition.$in = rawQuery.conditions;
  }

  if (rawQuery.location) {
    filter.location = filter.location || {};
    filter.location = rawQuery.location;
  }

  if (rawQuery.frontGears) {
    filter.frontGears = filter.frontGears || {};
    filter.frontGears = rawQuery.frontGears;
  }

  if (rawQuery.rearGears) {
    filter.rearGears = filter.rearGears || {};
    filter.rearGears = rawQuery.rearGears;
  }

  if (rawQuery.brakeType) {
    filter.brakeType = filter.brakeType || {};
    filter.brakeType = rawQuery.brakeType;
  }

  if (rawQuery.frameMaterial) {
    filter.frameMaterial = filter.frameMaterial || {};
    filter.frameMaterial = rawQuery.frameMaterial;
  }

  if (rawQuery.verification) {
    if (rawQuery.verification == "conditionAndFrame") {
      filter.conditionToBeVerified = filter.conditionToBeVerified || {};
      filter.frameToBeVerified = filter.frameToBeVerified || {};

      filter.conditionToBeVerified = true;
      filter.frameToBeVerified = true;
    } else if (rawQuery.verification == "condition") {
      filter.conditionToBeVerified = filter.conditionToBeVerified || {};

      filter.conditionToBeVerified = true;
    } else if (rawQuery.verification == "frame") {
      filter.frameToBeVerified = filter.frameToBeVerified || {};

      filter.frameToBeVerified = true;
    } else if (rawQuery.verification == "none") {
      filter.conditionToBeVerified = filter.conditionToBeVerified || {};
      filter.frameToBeVerified = filter.frameToBeVerified || {};

      filter.conditionToBeVerified = false;
      filter.frameToBeVerified = false;
    } else {
      delete filter.condition; // faulty parameter; no need to apply any filter
    }
  }

  if (rawQuery.type) {
    filter.type = filter.type || {};
    filter.type = rawQuery.type;
  }

  return filter;
}

function generateListingFilters(rawQuery) {
  var filter = {};

  if (rawQuery.minPrice) {
    filter.finalPrice = filter.finalPrice || {};
    filter.finalPrice.$gte = rawQuery.minPrice;
  }

  if (rawQuery.maxPrice) {
    filter.finalPrice = filter.finalPrice || {};
    filter.finalPrice.$lte = rawQuery.maxPrice;
  }

  return filter;
}

async function fetchBikesForListings(listings, bikeFilters) {
  await Promise.all(
    listings.map(async (listing) => {
      // assigning the bike model into a new 'bike' field
      let bike = await BikeModel.findOne(
        Object.assign({}, { _id: listing.bikeId }, bikeFilters)
      ).exec();
      listing.bike = bike;
    })
  );

  listings = listings.filter((listing) => listing.bike); // remove all listings with no bike (because of unmatching filter)

  return listings;
}
// @desc Get a single listing by the id
// @route GET /listing/id
const getListingById = async (req, res) => {
  console.log("Called listing by id");
  var listing;
  let bikeDeets;
  let sellerDeets;
  try {
    listing = await ListingModel.findById(req.params.id).exec();
    if (!listing) {
      return res.status(404).json("Listing not found");
    }
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
