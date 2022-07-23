// router for user operations
// @route /createUser
// @route /loginUser
// @route /updateUser
// @route /logout
// @route /userVerification
// @route /updatePassword
// @route /moveCreditToSeller
// @route /zeroCredit
// @route /api/refreshtoken
// @route /api/delete

const express = require("express");
const router = express.Router();

const {
  loginUser,
  createUser,
  updateUserById,
  refreshTokenGen,
  verify,
  updatePassword,
  moveCreditToSeller,
  zeroCredit,
  userVerification,
  logoutUser,
} = require("../controllers/userController");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.post("/updateUser", verify, updateUserById);

router.post("/logout", verify, logoutUser);

router.post("/userVerification", verify, userVerification);

router.post("/updatePassword", verify, updatePassword);

router.post("/moveCreditToSeller", verify, moveCreditToSeller);

router.post("/zeroCredit", verify, zeroCredit);

router.post("/api/refreshtoken", refreshTokenGen);

module.exports = router;
