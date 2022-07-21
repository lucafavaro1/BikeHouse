const express = require("express");
const router = express.Router();

const {
  loginUser,
  createUser,
  updateUserById,
  refreshTokenGen,
  deleteUserTest,
  verify,
  updatePassword,
  moveCreditToSeller,
  zeroCredit,
  userVerification,
  logoutUser,
} = require("../controllers/userController");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.post("/updateUser", updateUserById);

router.post("/logout", verify, logoutUser);

router.post("/userVerification", userVerification);

router.post("/updatePassword", updatePassword);

router.post("/moveCreditToSeller", moveCreditToSeller);

router.post("/zeroCredit", zeroCredit);

router.post("/api/refreshtoken", refreshTokenGen);

router.delete("/api/delete", verify, deleteUserTest);

module.exports = router;
