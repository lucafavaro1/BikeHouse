const OrderModel = require("../models/Order");
const ListingModel = require("../models/Listing");
const { AccessoryModel } = require("../models/Item");
const AddressModel = require("../models/Address");
const { getBike, getAccessory } = require("./bikeController");
const { getListing, fetchBikesForListings } = require("./listingController");

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
      var listing = await ListingModel.findById(rawListing.id).exec();
      listing = JSON.parse(JSON.stringify(listing));

      listing.insuranceName = rawListing.insuranceName
      listing.insurancePrice = rawListing.insurancePrice
      listing.deliveryType = rawListing.deliveryType
      listing.deliveryPrice = rawListing.deliveryPrice

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
      accessory = JSON.parse(JSON.stringify(accessory));

      accessory.quantity = rawAccessory.quantity

      accessoryObjects.push(accessory)
    })
  );

  // Fetching address
  var addressObject = {}
  addressObject = await AddressModel.findById(order.deliveryAddress)

  // Adding fetched objects and returning
  order.listingObjects = listingObjects
  order.accessoryObjects = accessoryObjects
  order.addressObject = addressObject
  return order;
}

module.exports = {
  getOrder,
  getOrdersByBuyer,
  deleteOrder,
  getPopulatedOrder,
};
