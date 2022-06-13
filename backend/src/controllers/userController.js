const UserModel = require("../models/Users");

// @desc Get user by email and password
// @route POST /users/login
const loginUser = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    // no JSON body
    res.status(400).send();
    return;
  }
  UserModel.find(req.body, (err, result) => {
    if (err) {
      res.status(404).json(err);
    } else if (result.length === 0) {
      // no errors but empty user array
      res.status(404).send();
    } else {
      res.status(200).json(result);
    }
  });
};

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save(); // async request to crease a new user
  res.json(newUser);
};

const updateUser = async (req, res) => {
  UserModel.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      age: req.body.age,
      username: req.body.username,
    },
    (err, result) => {
      if (err) {
        res.json(err); // send back the error
      } else {
        res.json(result); // send back the result to frontend
      }
    }
  );
};

module.exports = {
  loginUser,
  createUser,
  updateUser,
};
