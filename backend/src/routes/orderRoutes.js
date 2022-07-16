const express = require("express");
const { verify } = require("../controllers/userController");

const router = express.Router();

const { deleteOrder } = require("../controllers/orderController");

router.delete("/deleteOrder/:id", deleteOrder);

module.exports = router;
