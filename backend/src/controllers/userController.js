//controller for user

const UserModel = require("../models/Users");
const RefreshTokenModel = require("../models/RefreshToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AccessTokenModel = require("../models/AccessToken");
const AddressModel = require("../models/Address");

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

        let billingAddress = user.billingAddress.toString();
        const address = await AddressModel.findById(billingAddress);

        console.log(user);
        const responseToSend = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          birthdate: user.birthDate,
          isVerified: user.isVerified,
          verificationPictures: user.verificationPictures,
          averageRating: user.averageRating,
          email: user.email,
          balance: user.balance,
          billingAddress: {
            streetName: address.streetName,
            houseNumber: address.houseNumber,
            city: address.city,
            zip: address.zip,
            addressID: address._id,
          },
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

//function to create a new user
const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let address = {
      streetName: req.body.street,
      houseNumber: req.body.number,
      city: req.body.city,
      zip: req.body.zip,
    };
    const newAddress = new AddressModel(address);
    await newAddress.save(); // async request to crease a new user
    let user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      email: req.body.email,
      password: hashedPassword,
      billingAddress: newAddress,
    };
    const newUser = new UserModel(user);
    await newUser.save(); // async request to crease a new user
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({
      error: "Error in saving the user",
      message: "Error in saving the user!!" + error.message,
    });
  }
};

//function for the refresh token
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

//function to verify authenticity of session based on access token
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

//function for user to verify identity
const userVerification = async (req, res) => {
  try {
    let user = await UserModel.findByIdAndUpdate(req.body.user, {
      verificationPictures: req.body.photos,
    }).exec();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};

//function to logout user
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

//function to update user password
const updatePassword = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
          password: hashedPassword,
        }).exec();
        res.status(200).json(updatedUser);
      } else res.status(404).json(err);
    }
  } catch (err) {
    res.status(404).json(err);
  }
};

//function to move sold bike credits to seller account balance
const moveCreditToSeller = async (req, res) => {
  console.log("move credit to seller called");

  try {
    let user = await UserModel.findById(req.body.sellerId).exec();

    let newUser = await UserModel.findByIdAndUpdate(req.body.sellerId, {
      balance: user.balance + req.body.credit,
    }).exec();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(404).json(err);
  }
};

//function to set user balance to zero
const zeroCredit = async (req, res) => {
  console.log("zero credit called");
  try {
    let user = await UserModel.findByIdAndUpdate(req.body.userId, {
      balance: 0,
    }).exec();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};

//function to update a user by id
const updateUserById = async (req, res) => {
  console.log("update user by id called");
  let userId = req.body.userId;
  let stars = req.body.value;
  try {
    let user = await UserModel.findById(userId).exec();
    let numberNew = user.averageRating.numberOfReviews;
    let rating = user.averageRating.avg * numberNew + stars;
    numberNew += 1;
    rating = rating / numberNew;
    let newUser = await UserModel.findByIdAndUpdate(userId, {
      averageRating: {
        avg: rating,
        numberOfReviews: numberNew,
      },
    });
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

module.exports = {
  loginUser,
  createUser,
  updateUserById,
  refreshTokenGen,
  verify,
  updatePassword,
  userVerification,
  logoutUser,
  moveCreditToSeller,
  zeroCredit,
};
