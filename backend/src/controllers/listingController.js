const ListingModel = require("../models/Listing");

// @desc Get listings
// @route GET /listing
const getListings = async (req, res) => {
	let listings = await ListingModel.find().exec();
	console.log(listings)
	return res.status(200).json(listings)
};

module.exports = {
	getListings
};
