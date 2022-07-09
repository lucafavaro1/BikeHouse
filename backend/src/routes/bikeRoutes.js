const express = require("express");
const { verify } = require("../controllers/userController");

const router = express.Router();

const {
  createItem,
  createListing,
  imageUpload,
  deleteItemsDB,
} = require("../controllers/bikeControllers");

router.post("/createItem", verify, createItem);
router.post("/createListing", verify, createListing);
router.post("/image-upload", imageUpload);
router.post("/deleteItemsDB", deleteItemsDB);

module.exports = router;
