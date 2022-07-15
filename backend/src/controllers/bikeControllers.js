const ItemModel = require("../models/Item");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dddfwnt4q",
  api_key: "425483745239159",
  api_secret: "du6Q0cnP3TnEQVtP85YKSpkWXqg",
});

const imageUpload = async (req, res) => {
  const values = req.body.photos;
  const promises = values.map((image) =>
    cloudinary.uploader.upload(image.src, function (error, result) {})
  );

  Promise.all(promises).then((results) => res.status(200).json(results));
};

const createItem = async (req, res) => {
  console.log("create bike called");
  const item = req.body;
  const newItem = new ItemModel.BikeModel(item);
  await newItem.save(); // async request to crease a new user
  res.status(200).json(newItem);
};

const deleteBike = async (req, res) => {
  console.log("delete bike called");
  const bikeId = req.params.id;
  try {
    await ItemModel.BikeModel.findByIdAndDelete(bikeId);
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(404).json("Bike not found, could not be deleted");
  }
};

module.exports = {
  createItem,
  deleteBike,
  imageUpload,
};
