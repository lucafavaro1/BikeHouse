const ListingModel = require("../models/Listing");
const { BikeModel } = require("../models/Item");

// @desc Get listings
// @route GET /listing
const getListings = async (req, res) => {
	console.log()
	console.log("RAW QUERY:")
	console.log(req.query)

	let listingFilters = generateListingFilters(req.query)
	let bikeFilters = generateBikeFilters(req.query)

	console.log("GENERATED LISTING FILTER: ")
	console.log(listingFilters)
	console.log("GENERATED BIKE FILTER: ")
	console.log(bikeFilters)

	let listings = await ListingModel.find(listingFilters).exec(); // fetch listings

	listings = JSON.parse(JSON.stringify(listings)); // convert to JSON to support adding a new field (bike)

	listings = await fetchBikesForListings(listings, bikeFilters)





	listings = listings.sort((a, b) => Number(b.isBoosted) - Number(a.isBoosted))

	return res.status(200).json(listings)
};

function generateBikeFilters(rawQuery) {
	var filter = {}

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
		if (rawQuery.verification == 'conditionAndFrame') {
			filter.conditionToBeVerified = filter.conditionToBeVerified || {};
			filter.frameToBeVerified = filter.frameToBeVerified || {};

			filter.conditionToBeVerified = true
			filter.frameToBeVerified = true
		}
		else if (rawQuery.verification == 'condition') {
			filter.conditionToBeVerified = filter.conditionToBeVerified || {};

			filter.conditionToBeVerified = true
		}
		else if (rawQuery.verification == 'frame') {
			filter.frameToBeVerified = filter.frameToBeVerified || {};

			filter.frameToBeVerified = true
		}
		else if (rawQuery.verification == 'none') {
			filter.conditionToBeVerified = filter.conditionToBeVerified || {};
			filter.frameToBeVerified = filter.frameToBeVerified || {};

			filter.conditionToBeVerified = false
			filter.frameToBeVerified = false
		}
		else {
			delete filter.condition // faulty parameter; no need to apply any filter
		}

	}

	return filter
}

function generateListingFilters(rawQuery) {
	var filter = {}

	if (rawQuery.minPrice) {
		filter.finalPrice = filter.finalPrice || {};
		filter.finalPrice.$gte = rawQuery.minPrice;
	}

	if (rawQuery.maxPrice) {
		filter.finalPrice = filter.finalPrice || {};
		filter.finalPrice.$lte = rawQuery.maxPrice;
	}

	return filter
}

async function fetchBikesForListings(listings, bikeFilters) {

	await Promise.all(listings.map(async (listing) => { // assigning the bike model into a new 'bike' field
		let bike = await BikeModel.findOne(Object.assign({}, { _id: listing.bikeId }, bikeFilters)).exec()
		listing.bike = bike
	}))

	listings = listings.filter(listing => listing.bike); // remove all listings with no bike (because of unmatching filter)

	return listings
}

module.exports = {
	getListings
};
