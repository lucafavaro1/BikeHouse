// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")("sk_test_Y17KokhC3SRYCQTLYiU5ZCD2");

const YOUR_DOMAIN = "http://localhost:3000/";

const checkout = async (req, res) => {
  // const product = await stripe.products.create({
  //   name: "FakeItem",
  //   default_price_data: {
  //     unit_amount: 1000, // in cent, so 1000 = 10€
  //     currency: "EUR",
  //   },
  //   expand: ["default_price"],
  // });
  // console.log(product);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN + "/guide"}?canceled=true`,
  });

  res.redirect(303, session.url);
};

module.exports = {
  checkout,
};
