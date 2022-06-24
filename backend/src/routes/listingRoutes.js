const express = require("express");
const router = express.Router();

const {
	getListings
} = require("../controllers/listingController");

router.get("/listing", getListings);

module.exports = router;
