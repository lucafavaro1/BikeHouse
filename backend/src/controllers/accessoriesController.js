// Controller to get accessories
// @route /accessory

const { AccessoryModel } = require("../models/Item");

//function to get all accessories
const getAccessories = async (req, res) => {
  const perPage = 6;
  var page = req.query.page || 0;
  var sortingCriterion = req.query.sortingCriterion

  let accessories = await AccessoryModel.find() // fetch listings
    .limit(perPage)
    .skip(perPage * page)
    .exec();

  accessories = JSON.parse(JSON.stringify(accessories)); // convert to JSON to support adding a new field (bike)

  return res.status(200).json(accessories);
};

module.exports = {
  getAccessories,
};
