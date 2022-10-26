require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


const calculateOrderAmount = (items) => {
  let totalAmount = 0;

  items.map((item) => {
    const { price, Quantity } = item;
    totalAmount += price * Quantity;
  });

  return totalAmount * 100;
};


exports.handler = async (event) => {
  try {
    const { items, shipping, description } = JSON.parse(event.body);

     const paymentIntent = await stripe.paymentIntents.create({
     amount: calculateOrderAmount(items),
     currency: "twd",
     automatic_payment_methods: {
     enabled: true,
     },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
      // receipt_email:shipping.
    },
  });

    return {
      statusCode: 200,
      body: JSON.stringify({
    clientSecret: paymentIntent.client_secret,
  }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
