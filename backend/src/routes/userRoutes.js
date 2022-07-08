const express = require("express");
const router = express.Router();

const {
  loginUser,
  createUser,
  forgotPassword,
  refreshTokenGen,
  deleteUserTest,
  verify,
  updatePassword,
  userVerification,
  logoutUser,
} = require("../controllers/userController");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.post("/forgotPassword", forgotPassword);

router.post("/logout", verify, logoutUser);

router.post("/userVerification", userVerification);

router.post("/updatePassword", updatePassword);

router.post("/api/refreshtoken", refreshTokenGen);

router.delete("/api/delete", verify, deleteUserTest);

module.exports = router;
