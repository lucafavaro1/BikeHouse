const AddressModel = require("../models/Address");
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

const createOrder = async (req, res) => {
  console.log("create order called");
  const order = req.body;
  try {
    let address = {
      streetName: order.deliveryAddress.streetName,
      houseNumber: order.deliveryAddress.houseNumber,
      city: order.deliveryAddress.city,
      zip: order.deliveryAddress.zip,
      country: order.deliveryAddress.country,
      firstName: order.deliveryAddress.firstName,
      lastName: order.deliveryAddress.lastName,
      phoneNumber: order.deliveryAddress.phoneNumber,
      addressLine2: order.deliveryAddress.addressLine2,
    };
    console.log(address);
    const newAddress = new AddressModel(address);
    await newAddress.save();
    let newOrderFromRequest = {
      ...order,
      deliveryAddress: newAddress._id,
    };
    const newOrder = await OrderModel.create(newOrderFromRequest);
    res.status(200).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(404).json("Order not created");
  }
};

module.exports = {
  getOrder,
  deleteOrder,
  createOrder,
};
