const ListingModel = require("../models/Listing");
const { BikeModel } = require("../models/Item");

// @desc Get listings
// @route GET /listing
const getListings = async (req, res) => {
	let listings = await ListingModel.find().exec();
	listings = JSON.parse(JSON.stringify(listings));

	await Promise.all(listings.map(async (listing) => { // assigning the bike model into a new 'bike' field
		let bike = await BikeModel.findById(listing.bikeId).exec()
		listing.bike = bike
	}))

	listings = listings.sort((a, b) => Number(b.isBoosted) - Number(a.isBoosted))

	return res.status(200).json(listings)
};

module.exports = {
	getListings
};
