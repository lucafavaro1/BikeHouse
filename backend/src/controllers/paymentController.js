// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.

const { getOrder } = require("./orderController");

// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(
  "sk_test_51LGkBADlzVGR1dTFCHxnbCK4SokRlhFrfBpfi1CHA2fOmLtdV41V9xR7VcHzigGeYQgzqJQHMHpt7BtS4lDzA1tg00KN7697mY"
);

const YOUR_DOMAIN = "http://localhost:3000";

function listAllListings(listings) {
  let array_listings = [];
  listings.map((listing) => {
    // query the db to get the listing, change parameters below
    // price is based on listing price + insurance + delivery
    array_listings.append({
      price_data: {
        currency: "eur",
        product_data: {
          name: parameters.name,
        },
        unit_amount: parameters.price * 100,
      },
      quantity: 1,
    });
  });
}

// do the same also for listAllAccessories

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

const checkout_basket = async (req, res) => {
  console.log("CHECKOUT BASKET REACHED");
  const parameters = req.body;

  const order = getOrder(parameters.orderId);
  const items_listings = listAllListings(order.listings);
  const items_accessories = listAllAccessories(order.accessories);
  // now retrieve everything needed from the orderId

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
