import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Signup from "./pages/Signup.page";
import { UserProvider } from "./contexts/user.context";
import PrivateRoute from "./pages/PrivateRoute.page";
import Home2 from "./pages/Home2";
import CheckoutFinal from "./pages/CheckoutFinal";

import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Checkout, PageNotFound } from "./pages";
import { Navbar, Footer } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		{/* We are wrapping our whole app with UserProvider so that */}
		{/* our user is accessible through out the app from any page*/}
		<UserProvider>
			<Provider store={store}>
				<UserProvider>
        {/* Add Nabar Here - is accessible on all routes */}
					<Navbar />
					<Routes>
						{/* Home Page */}
						<Route path='/' element={<Home />} />

						{/* Product List */}
						<Route path='/product' element={<Products />} />

						{/* Individual Product */}
						<Route path='/product/:id' element={<Product />} />

						{/* About Page */}
						<Route path='/about' element={<AboutPage />} />

						{/* Contact Page */}
						<Route path='/contact' element={<ContactPage />} />

						{/* Cart Page */}
						<Route path='/cart' element={<Cart />} />

						{/* Login Page */}
						<Route exact path='/login' element={<Login />} />

						{/* Signup Page */}
						<Route exact path='/signup' element={<Signup />} />

						{/* We are protecting our Home Page from unauthenticated */}
						{/* users by wrapping it with PrivateRoute here. */}
						<Route element={<PrivateRoute />}>
							{/* User Home Page */}
							<Route exact path='/Home2' element={<Home2 />} />
						</Route>

						{/* Checkout Page */}
						<Route path='/checkout' element={<Checkout />} />

						{/* Page Not Found */}
						<Route path='*' element={<PageNotFound />} />

						{/* Page Not Found */}
						<Route path='/product/*' element={<PageNotFound />} />

						{/* Checkout Final */}
						<Route path='/CheckoutFinal' element={<CheckoutFinal />} />
					</Routes>
          {/* Add Footer Here - is also accessible on all routes */}
					<Footer />
				</UserProvider>
			</Provider>
		</UserProvider>
	</BrowserRouter>
);
