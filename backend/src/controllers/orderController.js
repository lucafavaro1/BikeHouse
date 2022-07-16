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

const getOrdersByBuyer = async (req, res) => {
  console.log("get order by buyer called");
  const buyerId = req.params.id;
  try {
    const orders = await OrderModel.find({ buyer: buyerId });
    if (orders.length == 0) {
      return res.status(200).json("You have no orders");
    }
    let newOrders = [...orders];
    newOrders.reverse();
    res.status(200).json(newOrders);
  } catch (error) {
    console.log(error);
    res.status(404).json("Buyer or orders not found");
  }
};

const getOrder = async (req) => {
  console.log("get order called");
  const orderId = req;
  try {
    const order = await OrderModel.findById(orderId).exec();
    return order;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getOrder,
  getOrdersByBuyer,
  deleteOrder,
};
