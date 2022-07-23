// router for payment operations
// @route /checkout-boost-specialist
// @route /checkout-basket

const express = require("express");
const { verify } = require("../controllers/userController");
const router = express.Router();

const {
  checkout_boost,
  checkout_basket,
} = require("../controllers/paymentController.js");

router.post("/checkout-boost-specialist", verify, checkout_boost);
router.post("/checkout-basket", verify, checkout_basket);

module.exports = router;
