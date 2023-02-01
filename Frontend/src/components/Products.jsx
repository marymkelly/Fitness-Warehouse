// Import React and State
import React, { useState } from "react";

// Product
import { useDispatch } from "react-redux";

// Adds Product To The Cart
import { addCart } from "../redux/action";

// Navigation To Individual Product Pages
import { Link } from "react-router-dom";

// Importing Product Data
import data from "./data.json"

// AOS Text Effect
import { useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';


/*
=============== 
Product List
===============
*/


const Products = () => {
  // Filters Product Display Based On Selected Category
  const [filter, setFilter] = useState(data);

  // Pre-Selects Category To Use As Future Link
  // const [btn, setBtn] = useState([
  //   {
  //     name: `martial arts`,
  //     isSelected: false,
  //     style: '9rem',
  //   },
  //   {
  //     name: `equipment`,
  //     isSelected: false,
  //     style: '7rem',
  //   },
  //   {
  //     name: `outdoor`,
  //     isSelected: false,
  //     style: '6rem',
  //   },
  //   {
  //     name: `other`,
  //     isSelected: false,
  //     style: '6rem',
  //   },
  // ])

  // AOS Text Effect
  useEffect(() => {
    AOS.init();
  }, [])

  // Takes Product As Parameter And Dispatches The 'addCart' Action To The Store, Adding Product To Cart
  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  // Takes Category As Paramter To Update Filter State Variable
  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  }

  // Displays Product Category Buttons, Filtered Product Data, and Add To Cart Button On Page
  const ShowProducts = () => {
    return (
      <>
        {/* Product Category Filter */}
        <div className="buttons text-center py-5">
          <button className="graphic2 btn-1 m-2" style={{width: '5rem'}} onClick={() => setFilter(data)}>All</button>
          <button className="graphic2 btn-1 m-2" style={{width: '9rem'}} onClick={() => filterProduct("martial arts")}>Martial Art's</button>
          <button className="graphic2 btn-1 m-2" style={{width: '7rem'}} onClick={() => filterProduct("equipment")}>Equipment</button>
          <button className="graphic2 btn-1 m-2" style={{width: '6rem'}} onClick={() => filterProduct("outdoor")}>Outdoor</button>
          <button className="graphic2 btn-1 m-2" style={{width: '6rem'}} onClick={() => filterProduct("other")}>Other</button>
        </div>

        {filter.map((product) => {
          return (

            // Individual Product Card
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                <div className="card previewShadow3 p-3 mb-5 bg-white rounded text-center h-100" key={product.id}>

                    {/* Image Link To Product */}
                    <Link to={"/product/" + product.id}>

                      {/* Image Hover Effect */}
                      <div className="box w-content">

                          {/* Product Image */}
                          <img
                            className="card-img-top p-3"
                            src={product.image}
                            alt="Card"
                            height={300}/>

                          {/* Image Hover Effect */}
                          <div className="frame">
                          </div>
                      </div>
                    </Link>

                  {/* Card Body */}
                  <div className="card-body">

                      {/* Text Link To Product */}
                      <Link to={"/product/" + product.id}>

                            {/* Product Title */}
                            <h5 className="card-title improv4">
                              {product.title.substring(0, 20)}...
                            </h5>

                            {/* Product Description */}
                            <p className="card-text improv4">
                              {product.description.substring(0, 90)}...
                            </p>
                      </Link>
                  </div >

                  {/* Product Price */}
                  <ul className="list-group productSwap" style = {{margin: 'auto'}}>
                    <li className="list-group-item lead productSwap2">${product.price}</li>
                  </ul>

                  {/* Add Product To Cart Button */}
                  <div className="card-body">
                    <button className="graphic2 btn-2 prodbtn" onClick={() => addProduct(product)}>
                      Add to Cart
                    </button>
                  </div>
                  
                </div>
            </div>

          );
        })}
      </>
    );
  };
  return (
    <>

      {/* Product Header  */}
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">

            {/* Header */}
            <h2 className="display-5 text-center mt-5 improv" data-aos="flip-left">Latest Products</h2>
            <hr />
          </div>
        </div>

        {/* Display Products */}
        <div className="row justify-content-center">
          {<ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
