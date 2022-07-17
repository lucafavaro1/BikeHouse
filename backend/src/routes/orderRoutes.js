const express = require("express");
const { verify } = require("../controllers/userController");

const router = express.Router();

const { deleteOrder, createOrder } = require("../controllers/orderController");

router.delete("/deleteOrder/:id", deleteOrder);
router.post("/api/createOrder", createOrder);

module.exports = router;
