// import Cart from "../Frontend/src/pages/Cart"
const fs = require("node:fs");
// This is your test secret API key.
const stripe = require("stripe")("sk_test_51MQg97Ipd7r3FnqnO5KhLULIzxDxRKcbJD9vNOfK9DZ8c4YJi7ISum1EV56rzJKpqC5qVBjyovezME2HSDchczab002fkVuyCf");
const YOUR_DOMAIN = "http://localhost:3000";

async function createStripeProduct(product, options = {}) {
	const stripeProduct = await stripe.products
		.create({
			name: product.title,
			desciption: product.desciption,
			images: product?.image ? [`${YOUR_DOMAIN}${product.image.slice(1)}`] : [],
			metadata: {
				product_title: product.title,
				data_id: product.id,
			},
			...options,
		})
		.catch((err) => ({ error: err }));

	return stripeProduct;
}

async function createStripeProductPrice(product, stripeProductId, options = {}) {
	const productPrice = product.price * 100;

	const price = await stripe.prices
		.create({
			unit_amount_decimal: productPrice.toString(),
			currency: "usd",
			product: stripeProductId,
			metadata: {
				product_title: product.title,
				data_id: product.id,
			},
			...options,
		})
		.catch((err) => ({ error: err }));

	return price;
}

async function createStripeProductAndPrice(product, productOptions = {}, priceOptions = {}) {
	if (!product) throw new Error("Product required");

	let stripeProduct = await createStripeProduct(product, productOptions).catch((err) => ({ error: err }));
	if (stripeProduct?.error) return stripeProduct;

	const stripeProductPrice = await createStripeProductPrice(product, stripeProduct.id, priceOptions).catch((err) => ({ error: err }));
	if (stripeProductPrice?.error) return stripeProductPrice;

	stripeProduct = await stripe.products.update(stripeProduct.id, { default_price: stripeProductPrice.id });

	console.log("STRIPE PROD", stripeProduct);

	return { product: stripeProduct, price: stripeProductPrice };
}

async function cleanupDuplicateStripeProducts(productMatches) {
	for (let i = 0; i < productMatches.length; i++) {
		if (i > 0) {
			if (productMatches[i]?.default_price) {
				await stripe.prices.update(productMatches[i].default_price, { active: false }).catch((err) => err);
			}
			// deactivate all prices matching a product to delete
			await stripe.prices
				.search({
					query: `active:\'true\' AND product:\'${productMatches[i].id}\'`,
				})
				.then(async (prices) => {
					if (prices.length > 0) {
						for (let price of prices) {
							await stripe.prices.update(price.id, { active: false }).catch((err) => err);
						}
					}
				})
				.catch((err) => ({ error: err }));

			// try to delete product
			await stripe.products.del(productMatches[i].id).catch((err) => {
				console.log("ERROR DELETING PRODUCT: ", productMatches[i].id);
				return { error: err };
			});
		}
	}
	// return array with "primary" entry only
	return [productMatches[0]];
}

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

app.get("/products", async function (req, res) {
	const products = await stripe.products
		.list()
		.then((prods) => prods.data)
		.catch((err) => ({
			error: err,
		}));

	if (products.error) {
		res.status(500).json({ error: products.error });
		return;
	}

	console.log(products.length);

	res.status(200).json({ message: "Success", products, length: products.length });
});

app.post("/products", async function (req, res) {
	// console.log("REQUEST DATA: ", req.body);

	const products = req.body.products;
	const mutatedProducts = [];

	async function cleanupDuplicateProducts(productMatches) {
		for (let i = 0; i < productMatches.length; i++) {
			if (i > 0) {
				if (productMatches[i]?.default_price) {
					await stripe.prices.update(productMatches[i]?.default_price, { active: false }).catch((err) => err);
				}

				// deactivate all prices matching a product to delete
				await stripe.prices
					.search({
						query: `active:\'true\' AND product:\'${productMatches[i].id}\'`,
					})
					.then(async (prices) => {
						if (prices.length > 0) {
							for (let price of prices) {
								await stripe.prices.update(price.id, { active: false }).catch((err) => err);
							}
						}
					})
					.catch((err) => ({ error: err }));

				// try to delete product
				await stripe.products.del(productMatches[i].id).catch((err) => {
					console.log("ERROR DELETING PRODUCT: ", productMatches[i].id);
					return { error: err };
				});
			}
		}

		// return array with "primary" entry only
		return [productMatches[0]];
	}

	for (const product of products) {
		console.log(`${product.title}: ${product.id}`);
		let productPriceId;

		let productMatches = await stripe.products
			.search({
				query: `active:\'true\' AND metadata[\'data_id\']:\'${product.id}\'`,
			})
			.then(async (m) => {
				if (m.data?.length > 0) return m.data;

				let retryMatch = await stripe.products
					.search({
						query: `active:\'true\' AND name:\'${product.title}\'`,
					})
					.then((m) => m.data)
					.catch((err) => ({ error: err }));

				return retryMatch;
			})
			.catch((err) => ({ error: err }));

		if (!productMatches?.error && productMatches.length > 0) {
			// cleanup products
			if (productMatches.length > 1) {
				productMatches = await cleanupDuplicateProducts(productMatches);
			}

			if (!productMatches[0]?.metadata?.data_id && !productMatches[0]?.metadata?.product_title) {
				const updates = {
					desciption: product.desciption,
					metadata: {
						data_id: Number.parseInt(product.id),
						product_title: product.title,
					},
				};

				if (product?.image && updates?.images?.length === 0) updates.images = [`${YOUR_DOMAIN}${product.image.slice(1)}`];

				const stripeProductUpdate = await stripe.products.update(productMatches[0].id, updates).catch((err) => ({ error: err }));
				if (!stripeProductUpdate?.error) productMatches = [stripeProductUpdate];
			}

			if (productMatches[0]?.default_price) {
				productPriceId = productMatches[0].default_price;
			} else {
				let matchingPriceArr = await stripe.prices
					.search({
						query: `active:\'true\' AND product:\'${productMatches[0].id}\'`,
					})
					.catch((err) => ({ error: err }));

				if (!matchingPriceArr.error && matchingPriceArr.length > 0) {
					productPriceId = matchingPriceArr[0].id;
				} else {
					const newProductPrice = await createStripeProductPrice(product, productMatches[0].id);
					if (!newProductPrice?.error) productPriceId = newProductPrice.id;
				}

				await stripe.products.update(productMatches[0].id, { default_price: productPriceId }).catch((err) => ({ error: err }));
			}

			mutatedProducts.push({ ...product, priceId: productPriceId });
		} else {
			const newProdAndPrice = await createStripeProductAndPrice(product).catch((err) => err);

			if (!newProdAndPrice?.error) {
				mutatedProducts.push({ ...product, priceId: newProdAndPrice.price.id });
			}
		}
	}

	// console.log("MUTATED PRODUCTS", mutatedProducts);

	if (res.body?.exportToFile) {
		let exportFile = res.body?.exportFile ?? "updatedProducts.js";
		fs.writeFileSync(exportFile, `let products = ${JSON.stringify(mutatedProducts)}`, { encoding: "utf8", flag: "w" });
	}

	res.status(200).json({ message: "Success", products: mutatedProducts });
});

app.post("/products/seed", async function (req, res) {
	// console.log("REQUEST DATA: ", req.body);
	const exportToFile = req.body?.exportToFile ?? false;
	const cleanupDuplicates = req.body?.removeDuplicates ?? false;
	const products = req.body.products ?? [];
	const mutatedProducts = [];

	for (const product of products) {
		console.log(`${product.title}: ${product.id}`);
		let productPriceId;

		let productMatches = await stripe.products
			.search({
				query: `active:\'true\' AND metadata[\'data_id\']:\'${product.id}\'`,
			})
			.then(async (m) => {
				if (m.data?.length > 0) return m.data;

				let retryMatch = await stripe.products
					.search({
						query: `active:\'true\' AND name:\'${product.title}\'`,
					})
					.then((m) => m.data)
					.catch((err) => ({ error: err }));

				return retryMatch;
			})
			.catch((err) => ({ error: err }));

		if (!productMatches?.error && productMatches.length > 0) {
			// optionally cleanup duplicate products and prices
			if (productMatches.length > 1 && cleanupDuplicates) {
				productMatches = await cleanupDuplicateStripeProducts(productMatches);
			}

			if (!productMatches[0]?.metadata?.data_id && !productMatches[0]?.metadata?.product_title) {
				const updates = {
					desciption: product.desciption,
					metadata: {
						data_id: Number.parseInt(product.id),
						product_title: product.title,
					},
				};

				if (product?.image && updates?.images?.length === 0) updates.images = [`${YOUR_DOMAIN}${product.image.slice(1)}`];

				const stripeProductUpdate = await stripe.products.update(productMatches[0].id, updates).catch((err) => ({ error: err }));
				if (!stripeProductUpdate?.error) productMatches = [stripeProductUpdate];
			}

			// if existing default price, set as productPriceId
			if (productMatches[0]?.default_price) {
				productPriceId = productMatches[0].default_price;
			} else {
				// find matching prices
				let matchingPriceArr = await stripe.prices
					.search({
						query: `active:\'true\' AND product:\'${productMatches[0].id}\' AND unit_amount_decimal:\'${product.price * 100}\'`,
					})
					.catch((err) => ({ error: err }));

				// if matches, setProductPriceId equal to the first element, otherwise create new price
				if (!matchingPriceArr.error && matchingPriceArr.length > 0) {
					productPriceId = matchingPriceArr[0].id;
				} else {
					const newProductPrice = await createStripeProductPrice(product, productMatches[0].id);
					if (!newProductPrice?.error) productPriceId = newProductPrice.id;
				}

				await stripe.products.update(productMatches[0].id, { default_price: productPriceId }).catch((err) => ({ error: err }));
			}

			mutatedProducts.push({ ...product, priceId: productPriceId });
		} else {
			const newProdAndPrice = await createStripeProductAndPrice(product).catch((err) => err);

			if (!newProdAndPrice?.error) {
				mutatedProducts.push({ ...product, priceId: newProdAndPrice.price.id });
			}
		}
	}

	console.log("MUTATED PRODUCTS", mutatedProducts);

	// optionally export data (products array with priceId appended to each product) to local file:
	if (exportToFile) {
		const exportFile = res.body?.exportFile ?? "updatedProducts.js";
		fs.writeFileSync(exportFile, `let products = ${JSON.stringify(mutatedProducts)}`, { encoding: "utf8", flag: "w" });
	}

	res.status(200).json({ message: "Success", products: mutatedProducts });
});

app.post("/checkout", async (req, res) => {
	// Data sent from frontend axios request in data param is accessed on req.body
	console.log("REQUEST DATA: ", req.body);
	console.log("REQUEST QUERY: ", req.query);
	// console.log should be visible in your server terminal

	async function createStripeShipping(amount, options = {}) {
		const shipping = await stripe.shippingRates
			.create({
				display_name: "Ground Shipping",
				type: "Fixed Amount",
				fixed_amount: { amount, currency: "usd" },
				...options,
			})
			.catch((err) => ({ error: err }));

		return shipping;
	}

	let products = req.body?.products ?? [];
	let shipping = req.body?.shipping ?? 0.0;

	let stripeProducts = [];

	console.log("PRODUCTS", products);

	if (products.length > 0) {
		for (let product of products) {
			const stripeProd = {
				quantity: product.qty,
				price: product.priceId,
			};

			stripeProducts.push(stripeProd);
		}
	}

	const stripeShipping = await createStripeShipping(shipping);

	// 	console.log("STRIPE FORMATTED PRODUCTS", stripeProducts);
	// 	// you would likely want to handle stripe here and now have access to the data sent over
	const session = await stripe.checkout.sessions.create({
		line_items: stripeProducts,
		mode: "payment",
		// success_url: `http://localhost:3001/checkout/success`,
		// cancel_url: `http://localhost:3001/checkout/cancel`,
		success_url: `${YOUR_DOMAIN}?success=true`,
		cancel_url: `${YOUR_DOMAIN}?canceled=true`,
		// automatic_tax: { enabled: true },
		// shipping_options: {
		// 	shipping_rate: stripeShipping.id,
		// },
	});

	// 	console.log("SESSION: ", session);
	// 	// res.redirect(303, session.url);
	// 	// send back successful status of 200 and whatever data we want to send back -- so an object with message in this case
	res.status(200).json({ message: "Success", url: session.url, id: session.id });
	// });
});

// app.post("/checkout", async (req, res) => {
// 	// Data sent from frontend axios request in data param is accessed on req.body
// 	console.log("REQUEST DATA: ", req.body);
// 	console.log("REQUEST QUERY: ", req.query);
// 	// console.log should be visible in your server terminal

// 	async function createStripeShipping(amount, options = {}) {
// 		const shipping = await stripe.shippingRates
// 			.create({
// 				display_name: "Ground Shipping",
// 				type: "Fixed Amount",
// 				fixed_amount: { amount, currency: "usd" },
// 				...options,
// 			})
// 			.catch((err) => ({ error: err }));

// 		return shipping;
// 	}

// 	let products = req.body?.products ?? [];
// 	let shipping = req.body?.shipping ?? 0.0;

// 	let stripeProducts = [];

// 	if (products.length > 0) {
// 		for (let product of products) {
// 			const stripeProd = {
// 				quantity: product.qty.toString(),
// 			};

// 			const productPrice = product.price * 100;
// 			// const productQuantity = product.qty.toString();

// 			const productMatch = await stripe.products
// 				.search({
// 					query: `active:\'true\' AND name:\'${product.title}\'`,
// 					// query: `active:\'true\' AND name:\'${product.title}\' AND metadata[\'data_id\']:\'${product.id}\'`,
// 				})
// 				.catch((err) => ({ error: err }));

// 			// console.log("product productMatches: ", productMatches);

// 			if (productMatch?.data && productMatch.data.length > 0) {
// 				// if default_price is not null on the first object in productMatch array, retrive the matching price, otherwise set to null.
// 				let matchPrice = !!productMatch.data[0].default_price ? await stripe.prices.retrieve(productMatch.data[0].default_price) : null;

// 				if (matchPrice && matchPrice.unit_amount == productPrice) {
// 					if (!(productMatch.productMatch.data[0].metadata?.data_id && productMatch.data[0].product_title)) {
// 						const newProduct = await stripe.products.update({
// 							name: product.title,
// 							desciption: product.desciption,
// 							images: product?.image ? [`${YOUR_DOMAIN}${product.image.slice(1)}`] : [],
// 							metadata: {
// 								data_id: product.id,
// 							},
// 						});
// 					}
// 					stripeProd.price = productMatch.data[0].default_price;
// 					// stripeProd.quantity = productQuantity;
// 				} else {
// 					console.log("price does not productMatches: ", matchPrice, productPrice);
// 					// let productMatchPrice = productMatch.data[0].default_price;
// 					// if matchPrice.id  exists, that means the price in Stripe doesn't productMatches the product amount sent by cart and we need to update it; matchPrice.id  does not exists, there was no price set on product and need to create new one
// 					let productMatchPrice = matchPrice?.id;

// 					if (productMatchPrice) {
// 						// prices cannot be deleted, so we have to set the outdated one to false so it won't be the default associated with the product
// 						const oldPriceUpdate = await stripe.prices.update(productMatchPrice, { active: false }).catch((err) => ({
// 							error: err,
// 						}));

// 						if (oldPriceUpdate?.error) {
// 							res.status(500).json({ error: oldPriceUpdate.error });
// 							return;
// 						}
// 					}

// 					// create new price for the product
// 					const newMatchedProductPrice = await stripe.prices.create({
// 						// unit_amount: productPrice,
// 						unit_amount_decimal: productPrice.toString(),
// 						currency: "usd",
// 						product: productMatch.data[0].id,
// 						metadata: {
// 							product_title: product.title,
// 							data_id: product.id,
// 						},
// 					});

// 					// temporarily set here to make sure that we tests that we can deactivate the old price before creating new product (differs from stripe doc example)
// 					// const oldPriceUpdate = await stripe.prices.update(productMatchPrice, { active: false }).catch((err) => ({
// 					// 	error: err,
// 					// }));
// 					// if (oldPriceUpdate?.error) throw new Error(`Error updating Stripe price: ${productMatchPrice}`);

// 					stripeProd.price = newMatchedProductPrice.id;
// 					// stripeProd.quantity = productQuantity;
// 				}
// 			} else {
// 				// create new product

// 				const newProdAndPrice = await createStripeProductAndPrice(product).catch((err) => err);
// 				stripeProd.price = newProdAndPrice.id;

// 				// const newProduct = await stripe.products.create({
// 				// 	name: product.title,
// 				// 	desciption: product.desciption,
// 				// images: product?.image ? [`${YOUR_DOMAIN}${product.image}`] : [],
// 				// 	metadata: {
// 				// 		product_title: product.title,
// 				// 		data_id: product.id,
// 				// 	},
// 				// });
// 				// const newProductPrice = await stripe.prices.create({
// 				// 	unit_amount: productPrice,
// 				// 	unit_amount_decimal: productPrice.toString(),
// 				// 	currency: "usd",
// 				// 	product: newProduct.id,
// 				// 	metadata: {
// 				// 		product_title: product.title,
// 				// 		data_id: product.id,
// 				// 	},
// 				// });
// 				// stripeProd.price = newProductPrice.id;
// 			}

// 			stripeProducts.push(stripeProd);
// 		}
// 	}

// 	console.log("STRIPE FORMATTED PRODUCTS", stripeProducts);
// 	// you would likely want to handle stripe here and now have access to the data sent over
// 	const session = await stripe.checkout.sessions.create({
// 		line_items: stripeProducts,
// 		mode: "payment",
// 		success_url: `http://localhost:3001/checkout/success`,
// 		cancel_url: `http://localhost:3001/checkout/cancel`,
// 		// success_url: `${YOUR_DOMAIN}?success=true`,
// 		// cancel_url: `${YOUR_DOMAIN}?canceled=true`,
// 		automatic_tax: { enabled: true },
// 	});

// 	console.log("SESSION: ", session);
// 	// res.redirect(303, session.url);
// 	// send back successful status of 200 and whatever data we want to send back -- so an object with message in this case
// 	res.status(200).json({ message: "Success", url: session.url, id: session.id });
// });

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

app.post("/info", function (req, res) {
	console.log("Info REQ", req.body, JSON.stringify(req.body));

	// fs.writeFileSync("fieldTest.js", `let fields = ${JSON.stringify(req.body)}`, { encoding: "utf8", flag: "w" });

	// for (const key in req.body) {
	// 	fs.appendFileSync(
	// 		"fieldTest.js",
	// 		`${key}: ${req.body[key]},\n`
	// 	);
	// }

	res.sendStatus(200);
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
