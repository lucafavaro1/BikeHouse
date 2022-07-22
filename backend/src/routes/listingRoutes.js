// route for listing operations
//@route /createListing
//@route /deleteListing/:id
//@route /listing
//@route /listing/:id
//@route /listingsBySeller/:id
//@route /modifyListing

const express = require("express");
const { verify } = require("../controllers/userController");

const router = express.Router();

const {
  createListing,
  getListings,
  getListingById,
  getListingsBySeller,
  modifyListing,
  deleteListing,
} = require("../controllers/listingController");

router.post("/createListing", verify, createListing);
router.delete("/deleteListing/:id", deleteListing);
router.get("/listing", getListings);
router.get("/listing/:id", getListingById);
router.get("/listingsBySeller/:id", getListingsBySeller);
router.post("/modifyListing", modifyListing);

module.exports = router;
