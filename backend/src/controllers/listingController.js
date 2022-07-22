//controller for listings

const ListingModel = require("../models/Listing");
const { BikeModel } = require("../models/Item");
const UserModel = require("../models/Users");

//function to create a listing
const createListing = async (req, res) => {
  console.log("create listing called");
  const listing = req.body;
  const newListing = new ListingModel(listing);
  await newListing.save(); // async request to crease a new listing
  res.status(200).json(newListing);
};

//function to delete a listing by id
const deleteListing = async (req, res) => {
  console.log("delete listing called");
  const listingId = req.params.id;
  try {
    await ListingModel.findByIdAndDelete(listingId);
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(404).json("Listing not found, could not be deleted");
  }
};


//function to get a listing by id
const getListing = async (req) => {
  console.log("get listing (one) called with id", req);
  const listingId = req;
  try {
    const listing = await ListingModel.findById(listingId).exec();
    return listing;
  } catch (error) {
    console.log(error);
  }
};

// @desc Get listings
// @route GET /listing
const getListings = async (req, res) => {
  const perPage = 6;
  var page = req.query.page || 0;
  var sortingCriterion = req.query.sortingCriterion;

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
    .sort(
      getPriceSortingObject(sortingCriterion)
    )
    .exec();

listings = JSON.parse(JSON.stringify(listings)); // convert to JSON to support adding a new field (bike)

listings = await fetchBikesForListings(listings, bikeFilters);

listings = sortListings(listings, sortingCriterion);

listings = applyPagination(listings, page, perPage);

return res.status(200).json(listings);
};

/** Returns a slice of the listings based on the provided pag number and perPage value */
function applyPagination(listings, page, perPage) {
  let startIndex = page * perPage;
  let endIndex = page * perPage + perPage;

  listings = listings.slice(startIndex, endIndex);
  return listings;
}

/** Sorts the listings based on isBoosted value, condition, frame verification, and creation date */
function sortListings(listings, criterion) {
  listings.sort(function (listing1, listing2) {

    // both boosted
    if (criterion == "default") {
      if (listing1.isBoosted && !listing2.isBoosted) return -1;
      else if (!listing1.isBoosted && listing2.isBoosted) return 1;
      else { // both boosted
        if (listing1.bike.condition > listing2.bike.condition) return -1;
        else if (listing1.bike.condition < listing2.bike.condition) return 1;
        else {
          // both boosted + same condition
          if (listing1.bike.frameVerified && !listing2.bike.frameVerified)
            return -1;
          else if (!listing1.bike.frameVerified && listing2.bike.frameVerified)
            return 1;
          else {
            // both boosted + same condition + both passed frame verification
            if (new Date(listing1.createdAt) > new Date(listing2.createdAt))
              return -1;
            else if (
              new Date(listing1.createdAt) < new Date(listing2.createdAt)
            )
              return 1;
          }
        }
      }
    } else if (criterion == "priceLH") {
      if (listing1.finalPrice > listing2.finalPrice) return 1;
      else if (listing1.finalPrice < listing2.finalPrice) return -1;
    } else if (criterion == "priceHL") {
      if (listing1.finalPrice > listing2.finalPrice) return -1;
      else if (listing1.finalPrice < listing2.finalPrice) return 1;
    }

    return 0;
  });

  return listings;
}

/** Returns an object to be sent to the backend for applying price-based sorting */
function getPriceSortingObject(criterion) {
  if (criterion == "priceLH") return { finalPrice: 1 };
  if (criterion == "priceHL") return { finalPrice: -1 };

  return {};
}

/** Generates a filter object for filtering bikes */
function generateBikeFilters(rawQuery) {
  var filter = {};

  if (rawQuery.searchKeyword) {
    filter.$or = filter.$or || [];
    filter.$or = [
      { model: { $regex: rawQuery.searchKeyword, $options: "i" } },
      { brand: { $regex: rawQuery.searchKeyword, $options: "i" } },
    ];
  }

  if (rawQuery.verifiedOnly) {
    filter.frameToBeVerified = filter.frameToBeVerified || {};
    filter.conditionToBeVerified = filter.frameToBeVerified || {};
    filter.frameToBeVerified = false;
    filter.conditionToBeVerified = false;
  }

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
      filter.condition = filter.condition || {};
      filter.frameVerified = filter.frameVerified || {};

      filter.condition.$gt = 0;
      filter.frameVerified = true;
    } else if (rawQuery.verification == "condition") {
      filter.condition = filter.condition || {};

      filter.condition.$gt = 0;
    } else if (rawQuery.verification == "frame") {
      filter.frameVerified = filter.frameVerified || {};

      filter.frameVerified = true;
    } else if (rawQuery.verification == "none") {
      filter.condition = filter.condition || {};
      filter.frameVerified = filter.frameVerified || {};

      filter.condition = 0;
      filter.frameVerified = false;
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

/** Generates a filter object for filtering listings */
function generateListingFilters(rawQuery) {
  var filter = { isActive: true };

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

/** Fetches and assigns bikes to listings based on the bikeId of each listing */
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
    listingToSend["isBoosted"] = listing.isBoosted;
    listingToSend["sellerId"] = sellerDeets._id;
    listingToSend["bikeId"] = bikeDeets._id;
    listingToSend["listingId"] = listing._id;
    listingToSend["location"] = bikeDeets.location;
    listingToSend["sellerName"] =
      sellerDeets.firstName + " " + sellerDeets.lastName;
    listingToSend["frameVerified"] = bikeDeets.frameVerified;
    listingToSend["bikeCondition"] = bikeDeets.condition;
    listingToSend["price"] = listing.finalPrice;
    listingToSend["images"] = bikeDeets.photos;
    listingToSend["description"] = bikeDeets.description;
    listingToSend["brand"] = bikeDeets.brand;
    listingToSend["model"] = bikeDeets.model;
    listingToSend["sellerVerified"] = sellerDeets.isVerified;
    listingToSend["category"] = bikeDeets.kind;
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

//function to get listings by seller
const getListingsBySeller = async (req, res) => {
  const sellerDeets = await UserModel.findById(req.params.id).exec();

  try {
    let listings = await ListingModel.find({ sellerId: req.params.id });
    if (listings.length == 0) {
      return res.status(200).json("You have no listings");
    }

    listings = JSON.parse(JSON.stringify(listings));
    listings = await fetchBikesForListingsV1(listings);

    // let bikeDeets = await BikeModel.findById(listings[0].bikeId).exec();
    // console.log("Listings:" + listings);
    // console.log("Bike details: " + bikeDeets);
    // console.log("Seller details: " + sellerDeets);

    return res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Listing not found");
  }
};

async function fetchBikesForListingsV1(listings) {
  await Promise.all(
    listings.map(async (listing) => {
      // assigning the bike model into a new 'bike' field
      let bike = await BikeModel.findOne(
        Object.assign({}, { _id: listing.bikeId })
      ).exec();
      listing.bike = bike;
    })
  );

  listings = listings.filter((listing) => listing.bike); // remove all listings with no bike (because of unmatching filter)

  return listings;
}

//function to modify listing by id
const modifyListing = async (req, res) => {
  console.log("modifyListing called");

  let isBoosted = req.body.isBoosted;
  let isActive = req.body.isActive;

  if (isBoosted != undefined) {
    console.log("modify isBoosted");
    try {
      let updatedListing = await ListingModel.findByIdAndUpdate(
        req.body.listingId,
        {
          isBoosted: isBoosted,
        }
      ).exec();
      res.status(200).json(updatedListing);
    } catch (err) {
      res.status(404).json(err);
    }
  }

  if (isActive != undefined) {
    console.log("modify isActive");

    try {
      let updatedListing = await ListingModel.findByIdAndUpdate(
        req.body.listingId,
        {
          isActive: false,
        }
      ).exec();
      res.status(200).json(updatedListing);
    } catch (err) {
      res.status(404).json(err);
    }
  }

  console.log("end reached");
};

module.exports = {
  createListing,
  deleteListing,
  getListings,
  getListing,
  getListingById,
  getListingsBySeller,
  modifyListing,
  fetchBikesForListings,
};
