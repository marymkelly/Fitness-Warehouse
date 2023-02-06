import React, { useState, useEffect } from "react";

// Link To Other Products
import { Link } from "react-router-dom";

// Extract Product ID
import { useParams } from "react-router-dom";

// Cycle Product's Effect
import Marquee from "react-fast-marquee";

// Product
import { useDispatch } from "react-redux";

// Adds Product To The Cart
import { addCart } from "../redux/action";

// Import Product Information Data
// import data from "../components/data.json";
import data from "../components/updateddata.json";

// Footer & Navbar
import { Footer, Navbar } from "../components";


/*
=======================
Individual Product Page 
=======================
*/


const Product = () => {

  // Extract Product ID
  const { id } = useParams();

  // Fetch Product Data To Update State
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const dispatch = useDispatch();

  console.log('data', data)
  
  useEffect(() => {    
    
    // searches through the data array and finds the product that matches the id passed in the URL. It then sets the 'product' state variable to this product.
    const foundProduct = data.find((item) => item.id === Number(id));
    setProduct(foundProduct);

    if (foundProduct) {

      // filter method to search through the data array and finds all the products that have the same category as the foundProduct, but are not the foundProduct itself. It sets the 'similarProducts' state variable to this filtered data.
      const similarData = data.filter((item) => item.category === foundProduct.category && item.id !== foundProduct.id);
      setSimilarProducts(similarData);
    }
  }, [id]);

  // Add Product To Cart
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  // Display Product Information
  const ShowProduct = () => {
    console.log(product);
    return ( 
      <>
        
        <div className="container my-5 py-2">
          <div className="row">

          {/* Product Image */}
          <div className="col-md-6 col-sm-12 py-3">
            <div className="box w-content">
                <img
                    className="img-fluid"
                    src={process.env.PUBLIC_URL+"/" + product.image}
                    alt={product.title}
                    width="400px"
                    height="400px"
                />
            </div>
          </div>

          {/* Product Information */}
          <div className="col-md-6 col-md-6 py-5">
              <div className="card card2 previewShadow2 shineGlow">

                  {/* Product Title */}
                  <div className="card-header">
                      <h1 className="card-title m-1 improv4">{product.title}</h1>
                  </div>

                  {/* Product Body */}
                  <div className="card-body improv4">

                      {/* Top Row */}
                      <div className="row">

                          {/* Catagory */}
                          <div className="col-md-4 mt-3">
                              <h5 className="card-text">Catagory:</h5>
                              <h4 className="card-text" style={{fontWeight: 'bold'}}>{product.category}</h4>
                          </div>

                          {/* Price */}
                          <div className="col-md-4 mt-3">
                              <h5 className="card-text">Price:</h5>
                              <h4 className="card-text" style={{fontWeight: 'bold'}}>${product.price}</h4>
                              
                          </div>

                          {/* Rating */}
                          <div className="col-md-4 mt-3">
                            <h5 className="card-text">Rating:</h5>
                            <h4 className="card-text" style={{fontWeight: 'bold'}}><i class="fa-solid fa-star"></i>{product.rate}</h4>
                          </div>
                      </div>

                      {/* Description */}
                      <h5 className="card-text mt-3">Description:</h5>
                      <ul className="card-text productBullet">
                            <li style={{listStyleType: 'disc'}}>{product.description}</li>
                        </ul>

                      {/* Additional Information */}
                      <h5 className="card-text mt-3">Additional Information:</h5>
                      <ul className="card-text productBullet">
                          <li style={{listStyleType: 'disc'}}>{product.extra1}</li>
                          <li style={{listStyleType: 'disc'}}>{product.extra2}</li>
                      </ul>

                      {/* Dimensions/Size */}
                      <h5 className="card-text mt-3">Dimensions/Size:</h5>
                        <ul className="card-text productBullet mb-3">
                            <li style={{listStyleType: 'disc'}}>{product.sizing}</li>
                        </ul>

                  </div>

                  <div className="card-footer d-flex justify-content-center">

                      {/* Add Button */}
                      <button 
                          className="graphic2 btn-2 m-2 mx-auto" style = {{width: '25vw'}}
                          onClick={() => addProduct(product)}>
                          Add to Cart
                      </button>
                  </div>

                    </div>
                </div>
            </div>
        </div>

      </>
      );
    };

const ShowSimilarProduct = () => {
    console.log(similarProducts)
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">

            {similarProducts.map((item) => {
              return (

                // Product
                <div key={item.id} className="card mx-4 text-center">
                    
                    {/* Image Link To Product */}
                    <Link to={"/product/" + item.id}>

                      {/* Image Hover Effect */}
                      <div className="box w-content">

                      {/* Card Picture */}
                      <img
                        className="card-img-top p-3"
                        src={process.env.PUBLIC_URL+"/" + item.image}
                        alt="Card"
                        height={300}
                        width={300}
                      />

                    {/* Image Hover Effect */}
                    <div className="frame"></div>
                    
                    </div>

                    </Link>

                  {/* Card Body */}
                  <div className="card-body">

                  {/* Text Link To Product */}
                  <Link to={"/product/" + item.id}>

                      {/* Product Title */}
                      <h5 className="card-title improv4">
                        {item.title.substring(0, 20)}...
                      </h5>

                      {/* Product Description */}
                      <p className="card-text improv4">
                        {product.description.substring(0, 50)}...
                      </p>
                      
                  </Link>

                  </div>

                  {/* Add Button */}
                  <div className="card-body">
                    <button
                      className="graphic2 btn-2 m-2 p-1"
                      onClick={() => addProduct(item)}>
                      Add to Cart
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Navbar */}
      {/* <Navbar /> */}
      <div className="container">

        {/* Show Product */}
        <div className="row">{<ShowProduct />}
        <div className="row my-5 py-5">

          {/* Header */}
          <div className="d-none d-md-block">
          <h2 className="">You may also Like</h2>

            {/* Cycle Product's Effect */}
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={70}>

            {/* Show Similar Product */}
            {<ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
};

export default Product;