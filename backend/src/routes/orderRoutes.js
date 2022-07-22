// router for order operations
// @route /deleteOrder/:id
// @route /getOrdersByBuyer/:id
// @route /order/:id
// @route /api/createOrder
// @route /updateOrder

const express = require("express");
const { verify } = require("../controllers/userController");

const router = express.Router();

const {
  deleteOrder,
  createOrder,
  getOrdersByBuyer,
  getPopulatedOrder,
  updateOrder,
} = require("../controllers/orderController");

router.delete("/deleteOrder/:id", deleteOrder);
router.get("/getOrdersByBuyer/:id", getOrdersByBuyer);
router.get("/order/:id", getPopulatedOrder);
router.post("/api/createOrder", createOrder);
router.post("/updateOrder/", updateOrder);

module.exports = router;
