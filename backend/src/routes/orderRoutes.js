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

router.delete("/deleteOrder/:id", verify, deleteOrder);
router.get("/getOrdersByBuyer/:id", verify, getOrdersByBuyer);
router.get("/order/:id", verify, getPopulatedOrder);
router.post("/api/createOrder", verify, createOrder);
router.post("/updateOrder/", verify, updateOrder);

module.exports = router;
