// import Cart from "../Frontend/src/pages/Cart"

// This is your test secret API key.
const stripe = require("stripe")("sk_test_51MQg97Ipd7r3FnqnO5KhLULIzxDxRKcbJD9vNOfK9DZ8c4YJi7ISum1EV56rzJKpqC5qVBjyovezME2HSDchczab002fkVuyCf");

// Sets Up Express server
const express = require("express");

// Method To Handle CORS (Cross-Origin Resource Sharing) Headers
const cors = require("cors");
const app = express();

app.get("/", (req, res) => {
	// res.send('hello world')
	res.send("home");
});
app.get("/cart", function (req, res) {
	res.send("cart test");
});
// Serve A Public Directory
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const ShowCart = require("../Frontend/src/pages/Cart");
// const { default: Cart } = require('../Frontend/src/pages/Cart');
// const { Product } = require('../Frontend/src/components');

// const total = ShowCart('subtotal')
// const quantity = ShowCart('totalItems')

const YOUR_DOMAIN = "http://localhost:3000";

// New Route On Express server For POST Request To Endpoint '/CheckoutFinal'
// Runs Async Function That Creates Checkout Session On Stripe Platform

app.post("/CheckoutFinal", async (req, res) => {
	console.log("b");

	// Method To Create Checkout Session That Takes Object As Argument That Contains Information
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				// price: 'total',
				// quantity: 'quantity',
			},
		],
		mode: "payment",
		success_url: `${YOUR_DOMAIN}?success=true`,
		cancel_url: `${YOUR_DOMAIN}?canceled=true`,
		automatic_tax: { enabled: true },
	});

	// Checkout Session URL Extracted From Response Of Stripe API Then Sent Back To Client In Response Of Endpoint In JSON Format
	res.json({ url: session.url });
	// res.redirect(303, session.url);
});
// require('./routes/cart.routes');

app.post("/checkout", async (req, res) => {
	// Data sent from frontend axios request in data param is accessed on req.body
	console.log("REQUEST DATA: ", req.body);
	console.log("REQUEST QUERY: ", req.query);
	// console.log should be visible in your server terminal

	// you would likely want to handle stripe here and now have access to the data sent over
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				price: "price_1MUDxLIpd7r3Fnqn0XEraHVs",
				quantity: "1",
			},
		],
		mode: "payment",
		success_url: `http://localhost:3001/checkout/success`,
		cancel_url: `http://localhost:3001/checkout/cancel`,
		// success_url: `${YOUR_DOMAIN}?success=true`,
		// cancel_url: `${YOUR_DOMAIN}?canceled=true`,
		automatic_tax: { enabled: true },
	});

	console.log("SESSION: ", session);
	// res.redirect(303, session.url);
	// send back successful status of 200 and whatever data we want to send back -- so an object with message in this case
	res.status(200).json({ message: "Success", url: session.url, id: session.id });
});

app.post("/checkout/items", async (req, res) => {
	// Data sent from frontend axios request in data param is accessed on req.body
	console.log("REQUEST DATA: ", req.body);

	let session;

	if (res?.body?.id) {
		session = await stripe.checkout.sessions.retrieve(res.body.id);
	}

	console.log("SESSION ITEMS: ", session);

	// send back successful status of 200 and whatever data we want to send back -- so an object with message in this case
	res.status(200).json({ message: "Session Items", items: session.data });
});

app.get("/checkout/success", async (req, res) => {
	res.status(200).send("Success");
});

app.get("/checkout/cancel", async (req, res) => {
	res.status(200).send("Cancelled");
});

const cartRoutes = require("./routes/cart.routes");
app.use("/cart", cartRoutes);
app.listen(3001, () => console.log("Running on port 3001"));

// something.routes.js
// module.exports = (app) => {
//         app.post("/api/carts", CartsController.addcart)
// }

// cart.controller.js
// module.exports.addproduct = (req,res) =>{
//     const newcart = req.body
//     Product.create(newcart)
//     .then(Product => res.json(cart))
//     .catch(err => res.json(err))
// }
