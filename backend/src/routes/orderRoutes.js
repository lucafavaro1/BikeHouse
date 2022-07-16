const express = require("express");
const { verify } = require("../controllers/userController");

const router = express.Router();

const {
  deleteOrder,
  getOrdersByBuyer,
} = require("../controllers/orderController");

router.delete("/deleteOrder/:id", deleteOrder);
router.get("/getOrdersByBuyer/:id", getOrdersByBuyer);

module.exports = router;
