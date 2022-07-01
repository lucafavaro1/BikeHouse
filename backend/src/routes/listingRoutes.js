const express = require("express");
const router = express.Router();

const {
  getListings,
  getListingById,
} = require("../controllers/listingController");

router.get("/listing", getListings);
router.get("/listing/:id", getListingById);

module.exports = router;
