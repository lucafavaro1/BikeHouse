const express = require("express");
const { verify } = require("../controllers/userController");

const router = express.Router();

const {
  deleteOrder,
  getOrdersByBuyer,
  getPopulatedOrder
} = require("../controllers/orderController");

router.delete("/deleteOrder/:id", deleteOrder);
router.get("/getOrdersByBuyer/:id", getOrdersByBuyer);
router.get("/order/:id", getPopulatedOrder);

module.exports = router;
