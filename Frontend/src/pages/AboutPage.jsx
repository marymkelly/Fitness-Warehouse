import React from 'react'

// Navbar & Footer Above & Below
import { Footer, Navbar } from "../components";
import App from "../app/App";

import '../app/index.css';

// AOS Text Effect
import { useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';


/*
===============
About Us Page
===============
*/


const AboutPage = () => {

  // AOS Text Effect
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
      {/* Navbar Section */}
      {/* <Navbar /> */}
      <div className="container my-3 py-3">

        {/* Company Text History */}
        <h1 className="text-center mt-5 improv" data-aos="zoom-out-up" >History</h1>
        <hr />
        <p style = {{margin:'auto', width: '70%', lineHeight: '1.5', marginBottom: '5rem'}} className="lead text-center improv2" >
        Celebrating over 15 years as an industry leader, Fitness Warehouse is committed to creating a healthier, 
        happier world through fitness. We started our journey because we saw a need for the exercise 
        community to have a market that they could rely on to find the best selection of gis, rash guards, shorts, 
        clothing, and training gear the industry has to offer. We've done the research, and have tried to bring you an awesome variety 
        of the top products on the market, with all of the important information you need to make a satisfying decision. We also proudly
        sponsor many sports events across the country so look for our company logo!
        </p>

      {/* Company Timeline History */}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="main-timeline">

              {/* Section 1 */}
              <div className="timeline">
                <a className="timeline-content">
                  <div className="timeline-icon">
                    <i className="fa fa-rocket" />
                  </div>
                  <span className="timeline-year">2008</span>
                  <h3 className="title">Foundation</h3>
                  <p className="description">
                    Starting with a dream of helping the greater fitness community. Doors officially open in Burbank, California in our first location
                  </p>
                </a>
              </div>

              {/* Section 2 */}
              <div className="timeline">
                <a className="timeline-content">
                  <div className="timeline-icon">
                    <i className="fa fa-arrow-trend-up" />
                  </div>
                  <span className="timeline-year">2011</span>
                  <h3 className="title">Expansion</h3>
                  <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer males uada tellus lorem, et condimentum neque commodo
                  </p>
                </a>
              </div>

              {/* Section 3 */}
              <div className="timeline">
                <a className="timeline-content">
                  <div className="timeline-icon">
                    <i className="fa fa-warehouse" />
                  </div>
                  <span className="timeline-year">2015</span>
                  <h3 className="title">Warehouse</h3>
                  <p className="description">
                    Starting with a dream of helping the greater fitness community. Doors officially open in Burbank, California in our first location
                  </p>
                </a>
              </div>

              {/* Section 4 */}
              <div className="timeline">
                <a className="timeline-content">
                  <div className="timeline-icon">
                    <i className="fa fa-globe" />
                  </div>
                  <span className="timeline-year">2023</span>
                  <h3 className="title">International</h3>
                  <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer males uada tellus lorem, et condimentum neque commodo
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Staff */}
        <div className="section ourTeam">

          {/* Header */}
          <header className="text-center">
            <h2 className="text-center mt-5 improv">Meet Our Team</h2>
          </header>
          <div className="row">

            {/* Employee 1 */}
            <div className="col-xs-6 col-sm-4 col-md-3 i">
              <div className="c text-center">
                <div className="wrap">

                  {/* Image */}
                  <img className="staff-image" src="./assets/Dave.jpg" alt="Dave"/>

                  {/* Name/Tittle */}
                  <div className="info">
                    <h3 className="name wordSwap">Dave Harmon</h3>
                    <h4 className="position wordSwap">CEO/Founder</h4>
                  </div>
                </div>
                <div className="more">

                  {/* Bio */}
                  <p className="wordSwap">Dave is the founder and CEO of Fitness Warehouse. With over 15 years of experience in the fitness industry, Dave is committed to providing the best selection of gis, rash guards, shorts, clothing, and training gear the industry has to offer. Under his leadership, Fitness Warehouse has become an industry leader and sponsor many sports events across the country.</p>
                  
                  {/* Social Media */}
                  <div className="socials">
                    <a href="https://www.facebook.com" title="#" className="facebook"><i className="fa fa-facebook" /></a>
                    <a href="https://twitter.com" title="#" className="twitter"><i className="fa fa-twitter" /></a>
                    <a href="https://plus.google.com" title="#" className="google-plus"><i className="fa fa-google-plus" /></a>
                    <a href="https://www.linkedin.com" title="#" className="linkedin"><i className="fa fa-linkedin" /></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee 2 */}
            <div className="col-xs-6 col-sm-4 col-md-3 i">
              <div className="c text-center">
                <div className="wrap">

                  {/* Image */}
                  <img className="staff-image"  src="./assets/Abby.jpg" alt=""/>
                  
                  {/* Name/Tittle */}
                  <div className="info">
                    <h3 className="name wordSwap">Abby Wu</h3>
                    <h4 className="position wordSwap">Head Of Production</h4>
                  </div>
                </div>
                <div className="more">
                  
                  {/* Bio */}
                  <p className="wordSwap">Abby is the head of production at Fitness Warehouse. With a background in supply chain management and production, Abby is responsible for ensuring that all products are manufactured to the highest standards of quality. She is dedicated to providing the best products to our customers and continuously improving our product lines.</p>
                  
                  {/* Social Media */}
                  <div className="socials">
                    <a href="https://www.facebook.com" title="#" className="facebook"><i className="fa fa-facebook" /></a>
                    <a href="https://twitter.com" title="#" className="twitter"><i className="fa fa-twitter" /></a>
                    <a href="https://plus.google.com" title="#" className="google-plus"><i className="fa fa-google-plus" /></a>
                    <a href="https://www.linkedin.com" title="#" className="linkedin"><i className="fa fa-linkedin" /></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee 3 */}
            <div className="col-xs-6 col-sm-4 col-md-3 i">
              <div className="c text-center">
                <div className="wrap">
                  
                  {/* Image */}
                  <img className="staff-image" src="./assets/Aaron.jpg" alt="Aaron" />
                  
                  {/* Name/Tittle */}
                  <div className="info">
                    <h3 className="name wordSwap">Aaron Meyers</h3>
                    <h4 className="position wordSwap">Sales Director</h4>
                  </div>
                </div>
                <div className="more">
                  
                  {/* Bio */}
                  <p className="wordSwap">Aaron is the Sales Manager at Fitness Warehouse. He has over 10 years of sales experience and is responsible for managing the sales team and driving revenue growth. Aaron is dedicated to providing the best customer service and ensuring that our customers find the right product to meet their needs.</p>
                  
                  {/* Social Media */}
                  <div className="socials">
                    <a href="https://www.facebook.com" title="#" className="facebook"><i className="fa fa-facebook" /></a>
                    <a href="https://twitter.com" title="#" className="twitter"><i className="fa fa-twitter" /></a>
                    <a href="https://plus.google.com" title="#" className="google-plus"><i className="fa fa-google-plus" /></a>
                    <a href="https://www.linkedin.com" title="#" className="linkedin"><i className="fa fa-linkedin" /></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee 4 */}
            <div className="col-xs-6 col-sm-4 col-md-3 i">
              <div className="c text-center">
                <div className="wrap">
                  
                  {/* Image */}
                  <img className="staff-image"  src="./assets/Susan.jpg" alt="Susan"/>
                  
                  {/* Name/Tittle */}
                  <div className="info">
                    <h3 className="name wordSwap">Susan Farley</h3>
                    <h4 className="position wordSwap">Senior Project Manager</h4>
                  </div>
                </div>
                <div className="more">

                  {/* Bio */}
                  <p className="wordSwap">Susan is the Marketing Director at Fitness Warehouse. With a background in marketing and communications, Susan is responsible for developing and executing the company's marketing strategy. She is dedicated to promoting the company's brand and growing its customer base through effective marketing campaigns.</p>
                  
                  {/* Social Media */}
                  <div className="socials">
                    <a href="https://www.facebook.com" title="#" className="facebook"><i className="fa fa-facebook" /></a>
                    <a href="https://twitter.com" title="#" className="twitter"><i className="fa fa-twitter" /></a>
                    <a href="https://plus.google.com" title="#" className="google-plus"><i className="fa fa-google-plus" /></a>
                    <a href="https://www.linkedin.com" title="#" className="linkedin"><i className="fa fa-linkedin" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    {/* Review's */}
    <App style = {{padding: '2rem'}}/>


      {/* Product varieties  */}
      <div >

        {/* Product Header */}
        <header className="text-center ">
          <h2 className="text-center mt-5 improv">Our Products</h2>
        </header>

        {/* Product Row */}
        <div className="row">

          {/* Products 1 */}
          <div className="col-xs-6 col-sm-4 col-md-3 i">
            <div className="wrap">
              <div className="container5">

                {/* Front Side */}
                <div className="front" style = {{height: '30vh', borderRadius: '5rem'}}>
                  <img className="card-img-top img" src="./assets/Bjj4.jpg" alt="Paypal" style={{objectFit: 'cover', height: 'inherit', borderRadius: '2rem'}} />
                  <div className="inner">
                    <p className="mt-5 improv" style = {{fontSize: '1.3rem'}}>Martial Art's</p>
                  </div>
                </div>

                {/* Back Side */}
                <div className="back" style = {{height: '30vh', borderRadius: '5rem'}}>
                  <img className="card-img-top img" src="./assets/Bjj4.jpg" alt="Paypal" style={{objectFit: 'cover', height: 'inherit', borderRadius: '1.5rem'}} />
                  <div className="inner">
                    <p className="mt-5 improv" style = {{fontSize: '1.3rem'}}>BJJ, Muay Thai and MMA</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Products 2 */}
          <div className="col-xs-6 col-sm-4 col-md-3 i">
            <div className="wrap">
              <div className="container5">

                {/* Front Side */}
                <div className="front" style = {{height: '30vh', borderRadius: '5rem'}}>
                  <img className="card-img-top img" src="./assets/main3.jpg" alt="Paypal" style={{objectFit: 'cover', height: 'inherit', borderRadius: '2rem'}} />
                  <div className="inner">
                    <p className="mt-5 improv" style = {{fontSize: '1.3rem'}}>Equipment</p>
                  </div>
                </div>

                {/* Back Side */}
                <div className="back" style = {{height: '30vh', borderRadius: '5rem'}}>
                  <img className="card-img-top img" src="./assets/main3.jpg" alt="Paypal" style={{objectFit: 'fill', height: 'inherit', borderRadius: '1.5rem'}} />
                  <div className="inner">
                    <p className="mt-5 improv" style = {{fontSize: '1.3rem'}}>Weights, Treadmills, etc</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Products 3 */}
          <div className="col-xs-6 col-sm-4 col-md-3 i">
            <div className="wrap">
              <div className="container5">

                {/* Front Side */}
                <div className="front" style = {{height: '30vh', borderRadius: '5rem'}}>
                  <img className="card-img-top img" src="./assets/Snow5.jpg" alt="Paypal" style={{objectFit: 'cover', height: 'inherit', borderRadius: '2rem'}} />
                  <div className="inner">
                    <p className="mt-5 improv" style = {{fontSize: '1.3rem'}}>Outdoor</p>
                  </div>
                </div>

                {/* Back Side */}
                <div className="back" style = {{height: '30vh', borderRadius: '5rem'}}>
                  <img className="card-img-top img" src="./assets/Snow5.jpg" alt="Paypal" style={{objectFit: 'cover', height: 'inherit', borderRadius: '1.5rem'}} />
                  <div className="inner">
                    <p className="mt-5 improv" style = {{fontSize: '1.3rem'}}>Bikes, snoboards and skateboards</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Products 4 */}
          <div className="col-xs-6 col-sm-4 col-md-3 i">
            <div className="wrap">
              <div className="container5">

                {/* Front Side */}
                <div className="front" style = {{height: '30vh', borderRadius: '5rem'}}>
                  <img className="card-img-top img" src="./assets/run.jpg" alt="Paypal" style={{objectFit: 'cover', height: 'inherit', borderRadius: '2rem'}} />
                  <div className="inner">
                    <p className="mt-5 improv" style = {{fontSize: '1.3rem'}}>Other</p>
                  </div>
                </div>

                {/* Back Side */}
                <div className="back" style = {{height: '30vh', borderRadius: '5rem'}}>
                  <img className="card-img-top img" src="./assets/run.jpg" alt="Paypal" style={{objectFit: 'cover', height: 'inherit', borderRadius: '1.5rem'}} />
                  <div className="inner">
                    <p className="mt-5 improv" style = {{fontSize: '1.3rem'}}>All kinds of items</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
        
      </div>

      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </>
  )
}

export default AboutPage