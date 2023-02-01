import React from "react";

// Footer & Navbar
import { Footer, Navbar } from "../components";

// Check Current Cart State
import { useSelector } from "react-redux";

// Link To Product's Page
import { Link } from "react-router-dom";

// Payment Option's Image's
import Credit from "../components/Credit"

import ProductDisplay from '../payment/app.jsx'

// AOS Effects
import { useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Checkout = () => {

  // Check Current Cart State
  const state = useSelector((state) => state.handleCart);
  
  // AOS Effects
  useEffect(() => {
    AOS.init();
  }, [])

  // No Item Cart
  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>

            {/* Link To Prodcuts */}
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {

    // If Empty Cart Then EmptyCart Function
    if(!state.length){
      return <EmptyCart/>
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
        <div className="container py-5">
          <div className="row my-4">

            {/* Right Side Cart */}
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">

                {/* Header */}
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <table className="table mt-3 mb-3">
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
                      <td><strong>Total amount</strong></td>
                      <td><strong>${Math.round(subtotal + shipping)}</strong></td>
                    </tr>
                  </tbody>
              </table>
              </div>
            </div>

            {/* Left Side Cart */}
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                {/* Header */}
                <div className="card-header py-3">
                  <h4 className="mb-0">Total Summary</h4>
                </div>

                {/* Stripe */}
                <ProductDisplay />

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
      <Navbar />
      <div className="container my-3 py-3">

        {/* Header */}
        <h1 className="text-center improv" data-aos="flip-up">Checkout</h1>
        <hr />

        {/* Empty or Full Cart? */}
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Checkout;
