const OrderModel = require("../models/Order");
const ListingModel = require("../models/Listing");
const { AccessoryModel } = require("../models/Item");
const { getBike, getAccessory } = require("./bikeController");
const { getListing, fetchBikesForListings } = require("./listingController");


// TODO: DELETE THIS
// const mongoose = require("mongoose");
// let order = {
//   buyer: mongoose.Types.ObjectId('62b5ac9935256aacccc7cb27'),
//   listings: [{
//     id: mongoose.Types.ObjectId('62c05aa58522e9bc4c3cfdde'),
//     insurance: "Qover",
//     deliveryType: "standard"
//   }],
//   accessories: [{
//     id: mongoose.Types.ObjectId('62c6b25ae1ffcffba53478a0'),
//     quantity: 2,
//     }],
//   totalAmount: 135,
//   deliveryAddress: mongoose.Types.ObjectId('62c895ae0c76f6f6bdd28ce6')
// };
// const newOrder = new OrderModel(order);
// console.log(newOrder)
//  newOrder.save(); // async request to crease a new user


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

const getPopulatedOrder = async (req, res) => {
  console.log("get populated order called");

  if (!req.params.id) {
    res.status(400).json()
  }

  const orderId = req.params.id;

  try {
    var order = await OrderModel.findById(orderId).exec();
    var rawListings = order.listings

    order = JSON.parse(JSON.stringify(order)); // convert to JSON to support adding a new field

    var order = await fetchFieldsForOrder(order)
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error)
    console.log(error);
  }
}

/** Fetches the listings, bikes, and accessories included in an order */
async function fetchFieldsForOrder(order) {
  // Fetching listings + bikes
  var listingObjects = []

  await Promise.all(
    order.listings.map(async (rawListing) => {
      let listing = await ListingModel.findById(rawListing.id).exec();
      listingObjects.push(listing)
    })
  );

  listingObjects = JSON.parse(JSON.stringify(listingObjects)); // convert to JSON to support adding a new field

  listingObjects = await fetchBikesForListings(listingObjects, {})

  // Fetching accessories
  var accessoryObjects = []

  await Promise.all(
    order.accessories.map(async (rawAccessory) => {
      let accessory = await AccessoryModel.findById(rawAccessory.id).exec();
      accessoryObjects.push(accessory)
    })
  );
  
  // Adding fetched objects and returning
  order.listingObjects = listingObjects
  order.accessoryObjects = accessoryObjects
  return order;
}

module.exports = {
  getOrder,
  getOrdersByBuyer,
  deleteOrder,
  getPopulatedOrder,
};
