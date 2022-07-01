const express = require("express");
const router = express.Router();

const {
  createItem,
  createListing,
  imageUpload,
} = require("../controllers/bikeControllers");

router.post("/createItem", createItem);
router.post("/createListing", createListing);
router.post("/image-upload", imageUpload);

module.exports = router;
