const express = require("express");
const router = express.Router();

const {
  loginUser,
  createItem,
  createUser,
  updateUser,
} = require("../controllers/userController");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.post("/createItem", createItem);

router.put("/updateUser", updateUser);

module.exports = router;
