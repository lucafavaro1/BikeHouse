const express = require("express");
const router = express.Router();

const {
  getUsers,
  loginUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.put("/updateUser", updateUser);

module.exports = router;
