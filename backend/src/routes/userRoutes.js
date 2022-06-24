const express = require("express");
const router = express.Router();

const {
  loginUser,
  createUser,
  updateUser,
  refreshTokenGen,
  deleteUserTest,
  verify,
  logoutUser,
} = require("../controllers/userController");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.post("/logout", verify, logoutUser);

router.put("/updateUser", updateUser);

router.post("/api/refreshtoken", refreshTokenGen);

router.delete("/api/delete", verify, deleteUserTest);

module.exports = router;
