const UserModel = require("../models/Users");

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
    let user = await UserModel.find(req.body).exec();
    if (user.length === 0) {
      // no errors but empty user array
      res.status(404).send();
    } else return res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save(); // async request to crease a new user
  res.json(newUser);
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

module.exports = {
  loginUser,
  createUser,
  updateUser,
};
