// Light/Dark Mode
import React, { useState } from 'react'
import Color from "../app/Color";

// Navigation To Different Pages
import { NavLink } from 'react-router-dom'

// Access State Of Cart And Display Item Quantity
import { useSelector } from 'react-redux'

// Access User Context Determining If They Are Logged In
import { UserContext } from "../contexts/user.context";
import { useContext } from "react";


/*
=======
Navbar 
=======
*/


const Navbar = () => {
    // Access User Cart
    const state = useSelector(state => state.handleCart)

    // Pass User Information
    const { user } = useContext(UserContext);

    // Light/Dark Mode Logo Toggle
    const [logo, setLogo] = useState("./assets/NewLogo2.jpg");
    const toggleLogo = () => {
        setLogo(logo === "./assets/NewLogo2.jpg" ? "./assets/NewLogo.jpg" : "./assets/NewLogo2.jpg");
    };
    return (
        // Navbar 
        <nav className="navbar navbar-expand-lg py-2 sticky-top" style={{ height: '7rem' }}>
            <div className="container topNav">
                    
                {/* Company Name/Logo */}
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/" ><img
                className="card-img"
                src={logo}
                alt="Card"
                height={100}/>
                </NavLink>

                {/* Nav Collapse */}
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Options */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center" >

                        {/* Home Page Button */}
                        <li><button className="nav-item graphic2 btn-1 m-2" >
                                <NavLink className="nav-link" to="/">Home </NavLink>
                            </button></li>

                        {/* Products Page Button */}
                        <li><button className="nav-item graphic2 btn-1 m-2" >
                                <NavLink className="nav-link" to="/product">Products</NavLink>
                            </button></li>

                        {/* About Page Button */}
                        <li><button className="nav-item graphic2 btn-1 m-2" >
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </button></li>

                        {/* Contact Page Button */}
                        <li><button className="nav-item graphic2 btn-1 m-2" >
                                <NavLink className="nav-link light" to="/contact">Contact</NavLink>
                            </button></li>

                    </ul>
                    
                    {/* Light/Dark Mode Button */}
                    <div>
                        <Color  toggleLogo={toggleLogo}/>
                    </div>
                    {/* Login/User-Home & Cart Button  */}
                    <div className="buttons text-center">
                    {user ? (<NavLink to="/login" className="btn btn-outline-dark m-2 graphic2 btn-1"style={{padding:'0.3rem'}}><i className="fa fa-user-plus mr-1"></i> Account</NavLink>) : (<NavLink to="/Home2" className="btn btn-outline-dark m-2 graphic2 btn-1"style={{padding:'0.3rem'}}><i className="fa fa-user-plus mr-1"></i> Account</NavLink>)}
                    <NavLink to="/cart" className="btn btn-outline-dark m-2 graphic2 btn-1"style={{padding:'0.3rem'}}><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                </div>
            </div>


            </div>
        </nav>
    )
}



export default Navbar