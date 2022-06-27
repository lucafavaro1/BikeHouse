const express = require("express");

const router = express.Router();

const { createItem, createListing } = require("../controllers/bikeControllers");
const { verify } = require("../controllers/userController");

router.post("/createItem", createItem);
router.post("/createListing", createListing);

module.exports = router;
