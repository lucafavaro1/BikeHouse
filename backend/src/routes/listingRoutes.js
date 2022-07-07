const express = require("express");
const router = express.Router();

const {
  getListings,
  getListingById,
  getListingsBySeller,
} = require("../controllers/listingController");

router.get("/listing", getListings);
router.get("/listing/:id", getListingById);
router.get("/listingsBySeller/:id", getListingsBySeller);

module.exports = router;
