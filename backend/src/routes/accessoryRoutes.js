// route to get accessories 
// @route /accessory

const express = require("express");
const router = express.Router();

const {
  getAccessories
} = require("../controllers/accessoriesController");

router.get("/accessory", getAccessories);

module.exports = router;
