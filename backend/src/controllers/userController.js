const UserModel = require("../models/Users");
const RefreshTokenModel = require("../models/RefreshToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AccessTokenModel = require("../models/AccessToken");
const emailkey = require("../emailKeyForgotPassword");

// @desc Get user by email and password
// @route POST /users/login
const loginUser = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    // no JSON body
    return res
      .status(400)
      .json({ error: "Bad Request", message: "The request body is empty" });
  }
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        const accessToken = await jwt.sign(
          { id: user._id, firstName: user.firstName, email: user.email },
          "sciencebitch",
          {
            expiresIn: "600m",
          }
        );
        const refreshToken = await jwt.sign(
          { id: user._id, firstName: user.firstName, email: user.email },
          "imtheonewhoknocks",
          {
            expiresIn: "600m",
          }
        );

        const newAccessTokenModel = new AccessTokenModel({
          accessToken: accessToken,
        });
        await newAccessTokenModel.save();

        const newRefreshTokenModel = new RefreshTokenModel({
          refreshToken: refreshToken,
        });
        await newRefreshTokenModel.save();
        console.log("newrefresh token saved to db");

        const responseToSend = {
          id: user._id,
          firstName: user.firstName,
          email: user.email,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };

        res.status(200).json(responseToSend);
      } else {
        console.log("compare is false");
        res.status(500).json({
          error: "Bad request",
          message: "Wrong username or password",
        });
      }
    } else {
      res
        .status(500)
        .json({ error: "Bad request", message: "Wrong username or password" });
    }
  } catch (error) {
    res.status(400).json({ error: "Bad request", message: error.message });
  }
};

const createUser = async (req, res) => {
  let user = req.body;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = { ...user, password: hashedPassword };
    const newUser = new UserModel(user);
    await newUser.save(); // async request to crease a new user
    res.json(newUser);
  } catch (error) {
    res.status(400).json({
      error: "Error in saving the user",
      message: "Error in saving the user!!" + error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.body;
  const user = await UserModel.findOne(email);
  // get back to frontend that the user was found
  res.json(data);
};

const refreshTokenGen = async (req, res) => {
  //take the refresh token
  const refreshToken = req.body.token;
  console.log("refresh token is " + refreshToken);
  //send error
  if (!refreshToken) return res.status(401).json("YOU ARE NOT AUTHENTICATED!");
  let refreshtokenFromDB;
  try {
    refreshtokenFromDB = await RefreshTokenModel.findOne({
      refreshToken: refreshToken,
    });
    if (!refreshtokenFromDB) {
      return res.status(403).json("REFRESH TOKEN NOT IN THE DB!");
    }
  } catch (error) {
    return res
      .status(403)
      .json("ERROR IN GETTING THE REFRESH TOKEN" + error.message);
  }
  jwt.verify(refreshToken, "imtheonewhoknocks", async (err, user) => {
    err && console.log(err);
    console.log("refresh token called");
    try {
      await RefreshTokenModel.deleteOne(refreshtokenFromDB);
      const newAccessToken = await jwt.sign(
        { id: user._id, firstName: user.firstName, email: user.email },
        "sciencebitch",
        {
          expiresIn: "600m",
        }
      );
      const newRefreshToken = await jwt.sign(
        { id: user._id, firstName: user.firstName, email: user.email },
        "imtheonewhoknocks",
        {
          expiresIn: "600m",
        }
      );
      const newAccessTokenModel = new AccessTokenModel({
        accessToken: newAccessToken,
      });
      await newAccessTokenModel.save();

      const newRefreshTokenModel = new RefreshTokenModel({
        refreshToken: newRefreshToken,
      });
      await newRefreshTokenModel.save();

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(403)
        .json(
          "ERROR IN ADDING/DELETING THE REFRESH TOKEN IN THE DB" + error.message
        );
    }
  });

  // if everything ok , send a new access token, refresh token
};

const updateUser = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    // no JSON body
    return res
      .status(400)
      .json({ error: "Bad Request", message: "The request body is empty" });
  }

  try {
    let user = UserModel.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
      age: req.body.age,
      username: req.body.username,
    }).exec();
    return res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};

const verify = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const authTokenFromDB = await AccessTokenModel.findOne({
        accessToken: token,
      });
      if (!authTokenFromDB) {
        return res.status(403).json("SESSION IS NOT VALID ANYMORE!");
      }
    } catch (error) {
      console.log(error);
      res.status(401).json("ERROR IS " + error.message);
    }
    jwt.verify(token, "sciencebitch", (err, user) => {
      if (err) {
        return res.status(403).json("TOKEN IS NOT VALID!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
};

const deleteUserTest = async (req, res) => {
  res.status(200).send("REsponse done! user deleted !");
};

const logoutUser = async (req, res) => {
  console.log("logout called");
  const refreshToken = req.body.token;
  const accessTokenHeader = req.headers.authorization;
  try {
    const accessToken = accessTokenHeader.split(" ")[1];
    await AccessTokenModel.deleteOne({ accessToken: accessToken });
    await RefreshTokenModel.deleteOne({ refreshToken: refreshToken });
    await res.status(200).json("User logged out!!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginUser,
  createUser,
  forgotPassword,
  deleteUserTest,
  refreshTokenGen,
  verify,
  logoutUser,
};
