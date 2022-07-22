//controller for payment

const { getBike, getAccessory } = require("./bikeController");
const { getListing } = require("./listingController");
const { getOrder } = require("./orderController");

const stripe = require("stripe")(
  "sk_test_51LGkBADlzVGR1dTFCHxnbCK4SokRlhFrfBpfi1CHA2fOmLtdV41V9xR7VcHzigGeYQgzqJQHMHpt7BtS4lDzA1tg00KN7697mY"
);

const YOUR_DOMAIN = "http://localhost:3000";

// function to get all selected listings and their prices
const listAllListings = async (listings) => {
  let array_listings = [];
  await Promise.all(
    listings.map(async (oneListing) => {
      // retrieve the listing from the db
      const listing = await getListing(oneListing.id);
      // define the price as the price of the ad
      let totalPrice = listing.finalPrice;
      // check if an insurance was selected
      const insurancePrice = oneListing.insurancePrice;
      totalPrice += insurancePrice;
      // if (insurance != "none")
      //   if (insurance == "GetSafe") totalPrice = totalPrice + 40;
      //   else if (insurance == "Feather") totalPrice = totalPrice + 30;
      //   else totalPrice = totalPrice + 20;

      // retrieve the bike from the db
      const bike = await getBike(listing.bikeId);

      // check if fast shipping was selected
      const shippingPrice = oneListing.deliveryPrice;
      totalPrice += shippingPrice;

      array_listings.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: bike.brand + " " + bike.model,
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      });
    })
  );
  return array_listings;
};

//function to get all selected accessories and their prices
const listAllAccessories = async (accessories) => {
  let array_accessories = [];
  await Promise.all(
    accessories.map(async (oneAccessory) => {
      // retrieve the accessory from the db
      const accessory = await getAccessory(oneAccessory.id);
      let totalPrice = accessory.price;
      totalPrice += oneAccessory.deliveryPrice;

      array_accessories.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: accessory.name,
          },
          unit_amount: totalPrice * 100,
        },
        quantity: oneAccessory.quantity,
      });
    })
  );
  return array_accessories;
};

//function to pay for boosting/specialist
const checkout_boost = async (req, res) => {
  console.log("CHECKOUT BOOST/SPECIALIST REACHED");
  const parameters = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: parameters.name,
          },
          unit_amount: parameters.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}` + parameters.successLink,
    cancel_url: `${YOUR_DOMAIN}` + parameters.cancelLink,
  });
  res.status(200).json({ url: session.url });
};

//function to pay for checkout basket
const checkout_basket = async (req, res) => {
  console.log("CHECKOUT BASKET REACHED");
  const parameters = req.body;

  const order = await getOrder(parameters.orderId);
  // create the list of items with syntax for the session
  const items_listings = await listAllListings(order.listings);
  const items_accessories = await listAllAccessories(order.accessories);

  const session = await stripe.checkout.sessions.create({
    line_items: items_listings.concat(items_accessories),
    mode: "payment",
    success_url: `${YOUR_DOMAIN}` + parameters.successLink,
    cancel_url: `${YOUR_DOMAIN}` + parameters.cancelLink,
  });
  res.status(200).json({ url: session.url });
};

module.exports = {
  checkout_boost,
  checkout_basket,
};
