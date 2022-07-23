// route for bike operations
// @route /createItem
// @route /deleteBike/:id
// @route /image-upload

const express = require("express");
const { verify } = require("../controllers/userController");

const router = express.Router();

const {
  createItem,
  deleteBike,
  imageUpload,
} = require("../controllers/bikeController");

router.post("/createItem", verify, createItem);
router.delete("/deleteBike/:id", verify, deleteBike);
router.post("/image-upload", imageUpload);

module.exports = router;
