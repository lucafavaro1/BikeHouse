const express = require("express");
const { verify } = require("../controllers/userController");

const router = express.Router();

const {
  createItem,
  createListing,
  imageUpload,
} = require("../controllers/bikeControllers");

router.post("/createItem", verify, createItem);
router.post("/createListing", verify, createListing);
router.post("/image-upload", imageUpload);

module.exports = router;
