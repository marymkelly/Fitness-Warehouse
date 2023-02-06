import React from "react";

// Footer & Navbar
import { Footer, Navbar } from "../components";

// Check Current Cart State
import { useSelector } from "react-redux";

// Link To Product's Page
import { Link } from "react-router-dom";

// Payment Option's Image's
import Credit from "../components/Credit";

import ProductDisplay from "../payment/app.jsx";

// AOS Effects
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Checkout = () => {
	// Check Current Cart State
	const state = useSelector((state) => state.handleCart);

	// AOS Effects
	useEffect(() => {
		AOS.init();
	}, []);

	// No Item Cart
	const EmptyCart = () => {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-12 py-5 bg-light text-center'>
						<h4 className='p-3 display-5'>No item in Cart</h4>

						{/* Link To Prodcuts */}
						<Link to='/' className='btn btn-outline-dark mx-4'>
							<i className='fa fa-arrow-left'></i> Continue Shopping
						</Link>
					</div>
				</div>
			</div>
		);
	};

	const ShowCheckout = () => {
		// If Empty Cart Then EmptyCart Function
		if (!state.length) {
			return <EmptyCart />;
		}

		// Cart Total
		let subtotal = 0;
		let shipping = 30.0;
		let totalItems = 0;

		state.forEach((item) => {
			subtotal += item.price * item.qty;
			totalItems += item.qty;
		});

		return (
			<>
				{/* Cart Body */}
				<div className='container py-5'>
					<div className='row my-4'>
						{/* Right Side Cart */}
						<div className='col-md-5 col-lg-4 order-md-last'>
							<div className='card mb-4'>
								{/* Header */}
								<div className='card-header py-3 bg-light'>
									<h5 className='mb-0'>Order Summary</h5>
								</div>
								<table className='table mt-3 mb-3'>
									<tbody>
										{/* Quantity and Price */}
										<tr>
											<td>Products ({totalItems})</td>
											<td>${Math.round(subtotal)}</td>
										</tr>

										{/* Shipping Price */}
										<tr>
											<td>Shipping</td>
											<td>${shipping}</td>
										</tr>

										{/* Total Amount */}
										<tr>
											<td>
												<strong>Total amount</strong>
											</td>
											<td>
												<strong>${Math.round(subtotal + shipping)}</strong>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							{/*  This button will handle sending back logic to your backend on click */}
							<button
								className='btn btn-dark btn-lg btn-block'
								onClick={async () => {
									const products = state;

									let response = await axios({
										method: "post",
										url: "http://localhost:3001/checkout",
										data: {
											products,
											shipping,
										},
									}).catch((error) => error.response);

									// Should see the response we sent back from the server in the browser console
									console.log("RESPONSE FROM SERVER: ", response);
									if (response.data.url) {
										// save local storage state 
										let decoded = decodeURI(response.data.url);
										window.location.assign(decoded);

										console.log("DECODED", decoded);
									}
								}}>
								Confirm Checkout
							</button>
						</div>

						{/* Left Side Cart */}
						<div className='col-md-7 col-lg-8'>
							<div className='card mb-4'>
								{/* Header */}
								<div className='card-header py-3'>
									<h4 className='mb-0'>Total Summary</h4>
								</div>

								{/* Stripe */}
								{/* <ProductDisplay /> */}

								{/* Copied your cart screen and removed users editing ability so they must confirm checkout */}
								<div className='card-body'>
									{state.map((item) => {
										return (
											// Product ID
											<div key={item.id}>
												<div className='row d-flex align-items-center'>
													{/* Product Image */}
													<div className='col-lg-3 col-md-12'>
														<div className='bg-image rounded' data-mdb-ripple-color='light'>
															{/* Image Link To Product */}
															<Link to={"/product/" + item.id}>
																{/* Image Hover Effect */}
																<div className='box w-content'>
																	<img src={item.image} alt={item.title} width={100} height={75} />
																</div>
															</Link>
														</div>
													</div>

													{/* Product Title */}
													<div className='col-lg-5 col-md-6 graphic3'>
														{/* Text Link To Product */}
														<h4>
															<strong>{item.title}</strong>
														</h4>
													</div>

													{/* Quantity Change and Price */}
													<div className='col-lg-4 col-md-6'>
														{/* Quantity and Price */}
														<p className='text-start text-md-center graphic3'>
															<strong>
																<span className='text-muted'>{item.qty}</span> x ${item.price}
															</strong>
														</p>
													</div>
												</div>
												<hr className='my-4' />
											</div>
										);
									})}
								</div>

								{/* Payment Options */}
								<Credit />
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};
	return (
		<>
			{/* Navbar */}
			{/* <Navbar /> */}
			<div className='container my-3 py-3'>
				{/* Header */}
				<h1 className='text-center improv' data-aos='flip-up'>
					Checkout
				</h1>
				<hr />

				{/* Empty or Full Cart? */}
				{state.length ? <ShowCheckout /> : <EmptyCart />}
			</div>

			{/* Footer */}
			{/* <Footer /> */}
		</>
	);
};

export default Checkout;
