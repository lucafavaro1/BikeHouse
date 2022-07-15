const express = require("express");
const { verify } = require("../controllers/userController");

const router = express.Router();

const {
  createItem,
  deleteBike,
  imageUpload,
} = require("../controllers/bikeControllers");

router.post("/createItem", verify, createItem);
router.delete("/deleteBike/:id", deleteBike);
router.post("/image-upload", imageUpload);

module.exports = router;
