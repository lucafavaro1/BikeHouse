// router for payment operations
// @route /checkout-boost-specialist
// @route /checkout-basket

const express = require("express");
const router = express.Router();

const {
  checkout_boost,
  checkout_basket,
} = require("../controllers/paymentController.js");

router.post("/checkout-boost-specialist", checkout_boost);
router.post("/checkout-basket", checkout_basket);

module.exports = router;
