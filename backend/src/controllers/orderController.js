//controller for orders

const AddressModel = require("../models/Address");
const OrderModel = require("../models/Order");
const ListingModel = require("../models/Listing");
const { AccessoryModel } = require("../models/Item");
const { getBike, getAccessory } = require("./bikeController");
const { getListing, fetchBikesForListings } = require("./listingController");

//function to delete order by id
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

//function to get orders by buyer id
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

//function to get order by id
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

//function to get the populated order
const getPopulatedOrder = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json();
  }

  const orderId = req.params.id;

  try {
    var order = await OrderModel.findById(orderId).exec();
    var rawListings = order.listings;

    order = JSON.parse(JSON.stringify(order)); // convert to JSON to support adding a new field

    var order = await fetchFieldsForOrder(order);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

/** Fetches the listings, bikes, and accessories included in an order */
async function fetchFieldsForOrder(order) {
  // Fetching listings + bikes
  var listingObjects = [];

  await Promise.all(
    order.listings.map(async (rawListing) => {
      var listing = await ListingModel.findById(rawListing.id).exec();
      listing = JSON.parse(JSON.stringify(listing));

      listing.insuranceName = rawListing.insuranceName;
      listing.insurancePrice = rawListing.insurancePrice;
      listing.deliveryType = rawListing.deliveryType;
      listing.deliveryPrice = rawListing.deliveryPrice;
      listing.feedback = rawListing.feedback;

      listingObjects.push(listing);
    })
  );

  listingObjects = JSON.parse(JSON.stringify(listingObjects)); // convert to JSON to support adding a new field

  listingObjects = await fetchBikesForListings(listingObjects, {});

  // Fetching accessories
  var accessoryObjects = [];

  await Promise.all(
    order.accessories.map(async (rawAccessory) => {
      let accessory = await AccessoryModel.findById(rawAccessory.id).exec();
      accessory = JSON.parse(JSON.stringify(accessory));

      accessory.quantity = rawAccessory.quantity;

      accessoryObjects.push(accessory);
    })
  );

  // Fetching address
  var addressObject = {};
  addressObject = await AddressModel.findById(order.deliveryAddress);

  // Adding fetched objects and returning
  order.listingObjects = listingObjects;
  order.accessoryObjects = accessoryObjects;
  order.addressObject = addressObject;
  return order;
}

//function to create a new order
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

//function to update order by id
const updateOrder = async (req, res) => {
  console.log("update order called");
  const orderId = req.body.orderId;
  const listingId = req.body.listingId;
  const feedback = req.body.feedback;

  try {
    const order = await OrderModel.findById(orderId).exec();
    order.listings.forEach((listing) => {
      if (listing.id == listingId) listing.feedback = feedback;
    });
    const modifiedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      order
    ).exec();
    res.status(200).json(modifiedOrder);
  } catch (error) {
    console.log(error);
    res.status(404).json("Order not found / not able to modify");
  }
};

module.exports = {
  getOrder,
  getOrdersByBuyer,
  deleteOrder,
  getPopulatedOrder,
  createOrder,
  updateOrder,
};
