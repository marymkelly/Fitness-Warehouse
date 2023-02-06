import React from "react";

// Footer & Navbar
import { Footer, Navbar } from "../components";

// Access Cart State & Dispatch Cctions To Update Cart
import { useSelector, useDispatch } from "react-redux";

// Add & Remove Product From Cart
import { addCart, delCart } from "../redux/action";

// Link to Prodcut's Page & Checkout
import { Link } from "react-router-dom";

// Payment Option's Logo's
import Credit from "../components/Credit"

// AOS Text Effect
import { useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';


/*
=========
Cart Page 
=========
*/


const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  // AOS Text Effect
  useEffect(() => {
    AOS.init();
  }, [])

  // Empty Cart
  const EmptyCart = () => {
    return (
      <div className="container">

        <div className="row">
          <div className="col-md-12 py-5 bg-light silverToDark text-center">
            <h4 className="p-3 display-5 improv4">Your Cart is Empty</h4>

            {/* Link to Prodcuts */}
            <Link to="/product" className="btn  btn-outline-dark mx-4 graphic2 btn-2 p-2">
              <i className="fa fa-arrow-left "></i> Continue Shopping
            </Link>

          </div>
        </div>

        {/* Payment Options */}
        <Credit />

      </div>

    );
  };

  // Add Product Quantity
  const addItem = (product) => {
    dispatch(addCart(product));
  };

  // Minus Product Quantity
  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  // User Cart Total
  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        {/* Cart Summary */}
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">

                    {/* Cart Header */}
                    <div className="card-header py-3">
                      <h5 className="mb-0 graphic3">Item List</h5>
                    </div>

                  {/* Left Side Cart */}
                  <div className="card-body">
                    {state.map((item) => {
                      return (

                        // Product ID
                        <div key={item.id}>
                          <div className="row d-flex align-items-center">

                            {/* Product Image */}
                            <div className="col-lg-3 col-md-12">
                                  <div
                                    className="bg-image rounded"
                                    data-mdb-ripple-color="light">

                                    {/* Image Link To Product */}
                                    <Link to={"/product/" + item.id}>

                                    {/* Image Hover Effect */}
                                    <div className="box w-content">
                                      <img
                                        src={item.image}
                                        alt={item.title}
                                        width={100}
                                        height={75}/>
                                    </div>

                                  </Link>

                                  </div>
                            </div>

                            {/* Product Title */}
                            <div className="col-lg-5 col-md-6 graphic3">
                                
                                {/* Text Link To Product */}
                                <Link to={"/product/" + item.id}>
                                  <h4>
                                    <strong>{item.title}</strong>
                                  </h4>
                                </Link>

                            </div>

                            {/* Quantity Change and Price */}
                            <div className="col-lg-4 col-md-6">
                              <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                {/* Add Quantity*/}
                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    removeItem(item);
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                {/* Quantity */}
                                <span className="mx-5"  style={{ color: "black" }}>{item.qty}</span>

                                {/* Minus Quantity*/}
                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    addItem(item);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              {/* Quantity and Price */}
                              <p className="text-start text-md-center graphic3">
                                <strong>
                                  <span className="text-muted">{item.qty}</span>{" "}
                                  x ${item.price}
                                </strong>
                              </p>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Payment Options */}
                  <Credit />
                </div>
              </div>

              {/* Right Side Cart */}
              <div className="col-md-4">
                <div className="card mb-4">

                  {/* Card Title */}
                  <div className="card-header py-3 bg-light ">
                    <h5 className="mb-0 graphic3">Order Summary</h5>
                  </div>

                  {/* Card Body */}
                  <div className="card-body">
                    <table className="table">
                      <thead className="thead-light">

                        {/* Quantity and Price */}
                        <tr>
                          <th>Products ({totalItems})</th>
                          <th>${Math.round(subtotal)}</th>
                        </tr>

                        {/* Shipping Price */}
                        <tr>
                          <th>Shipping</th>
                          <th>${shipping}</th>
                        </tr>

                        {/* Total Amount */}
                        <tr>
                          <th>Total amount</th>
                          <th>${Math.round(subtotal + shipping)}</th>
                        </tr>
                      </thead>
                    </table>

                    {/* Checkout Button */}
                    <Link
                      to="/checkout"
                      className="btn btn-dark btn-lg btn-block graphic2 btn-2"
                    >
                      Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>

      {/* Navbar */}
      {/* <Navbar /> */}
      <div className="container my-3 py-3">
        {/* Cart Header */}
        <h1 className="text-center improv" data-aos="flip-up">Shopping Cart</h1>
        <hr />
        {/* Empty or Full Cart? */}
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
};

export default Cart;
