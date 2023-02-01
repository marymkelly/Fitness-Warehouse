const express = require('express');
const Strip =  require('stripe');

require("dotenv").config();

// Strip object initialized with Stripe key from '.env' file 
const stripe = require(process.env.STRIPE_KEY)

// New Route On Express server
const router = express.Router()

// Route Is Post Request To End Point '/create-checkout-session'
// Async Function Creates Checkout Session On Stripe Platform
router.post('/create-checkout-session', async (req, res) => {

// Method To Create Checkout Session That Takes Object As Argument
const session = await stripe.checkout.sessions.create({
    line_items: [
    {
        price_data: {
        currency: 'usd',
        product_data: {
            name: 'T-shirt',
        },
        unit_amount: 2000,
        },
        quantity: 1,
    },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
});

// Checkout Session URL Is Extracted From Response Of Stripe API & Sent Back To Client In Response Of Endpoint
res.send({url: session.url});
});

module.exports = router;
