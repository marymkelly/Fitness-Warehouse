import React from "react";

// Link To Product Category
import { NavLink } from 'react-router-dom'

// AOS Text Effect
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect} from "react";


/*
===========================
Home Page Category Preview
===========================
*/


const Preview = () => {

    // AOS Text Effect
    useEffect(() => {
        AOS.init();
    }, [])
    return (
    <>
        {/* Header */}
        <h1 className="text-center mt-5 improv" data-aos="fade-down">Shop Our Categories</h1>

            <div className="container my-5 py-2">
                <div className="row">

                    {/* Image 1 */}
                    {/* Hover Effect */}
                    <div className="previewHover col-6" style={{padding: '0.5rem'}}>

                        {/* Image Link To Category */}
                        <NavLink className="nav-link previewShadow" to="/product">
                            <figure>
                                <div className="previewSection">

                                    {/* Image */}
                                    <img    className="img-fluid"
                                            src="./assets/Bjj2.jpg"
                                            alt="Martial Art's"
                                            style={{objectFit: 'cover'}}/>

                                        {/* Button Link To Category */}
                                        <button className="graphic btn-1 previewShadow2">
                                            <h3 style={{margin: '1rem'}}>Martial Arts</h3>
                                        </button>
                                </div>
                            </figure>
                        </NavLink>
                    </div>

                    {/* Image 2 */}
                    {/* Hover Effect */}
                    <div className="previewHover col-6" style={{padding: '0.5rem'}}>

                        {/* Image Link To Category */}
                        <NavLink className="nav-link previewShadow" to="/product">
                            <figure>
                                <div className="previewSection">

                                    {/* Image */}
                                    <img    className="img-fluid"
                                            src="./assets/Fit.jpg"
                                            alt="Equipment"
                                            style={{objectFit: 'cover'}}/>

                                    {/* Button Link To Category */}
                                    <button className="graphic btn-1 previewShadow2">
                                        <h3 style={{margin: '1rem'}}>Equipment</h3>
                                    </button>
                                </div>
                            </figure>
                        </NavLink>
                    </div>

                    {/* Image 3 */}
                    {/* Hover Effect */}
                    <div className="previewHover col-6" style={{padding: '0.5rem'}}>

                        {/* Image Link To Category */}
                        <NavLink className="nav-link previewShadow" to="/product">
                            <figure>
                                <div className="previewSection">

                                    {/* Image */}
                                    <img    className="img-fluid"
                                            src="./assets/Bike5.jpg"
                                            alt="Martial Art's"
                                            style={{objectFit: 'cover'}}/>

                                    {/* Button Link To Category */}
                                    <button className="graphic btn-1 previewShadow2">
                                        <h3 style={{margin: '1rem'}}>Outdoor</h3>
                                    </button>
                                </div>
                            </figure>
                        </NavLink>
                    </div>

                    {/* Image 4 */}
                    {/* Hover Effect */}
                    <div className="previewHover col-6" style={{padding: '0.5rem'}}>

                        {/* Image Link To Category */}
                        <NavLink className="nav-link previewShadow" to="/product">
                            <figure>
                                <div className="previewSection">

                                    {/* Image */}
                                    <img    className="img-fluid"
                                            src="./assets/Yoga.jpg"
                                            alt="Martial Art's"
                                            style={{objectFit: 'cover'}}/>

                                    {/* Button Link To Category */}
                                    <button className="graphic btn-1 previewShadow2">
                                        <h3 style={{margin: '1rem'}}>Other</h3>
                                    </button>
                                </div>
                            </figure>
                        </NavLink>
                    </div>

                </div>
            </div>
    </>
);
};

// AOS Effect Duration
AOS.init({
    duration: 1200,
})

export default Preview;
