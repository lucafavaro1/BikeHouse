const OrderModel = require("../models/Order");

const deleteOrder = async (req, res) => {
  console.log("delete order called");
  const orderId = req.params.id;
  try {
    await OrderModel.findByIdAndDelete(orderId).exec();
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(404).json("Order not found, could not be deleted");
  }
};

const getOrder = async (req, res) => {
  console.log("get order called");
  const orderId = req.params.id;
  try {
    const order = await OrderModel.findById(orderId).exec();
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(404).json("Order not found");
  }
};

module.exports = {
  getOrder,
  deleteOrder,
};
