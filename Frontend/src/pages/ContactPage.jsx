import React from "react";

// Navbar & Footer
import { Footer, Navbar } from "../components";

// Google Maps API
import GoogleMap from "../components/maps"

// AOS Text Effect
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect} from "react";


/*
============
Contact Page 
============
*/


const ContactPage = () => {

  // AOS Text Effect
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
      {/* Navbar */}
      <Navbar />

    <section id="contact">
    
      {/* Header */}
      <h1 className="improv text-center my-3" data-aos="flip-down">Contact Us</h1>
      <div>
      <div className="contact-wrapper">

        {/* Left contact page */}
        {/* Form */}
        <form id="contact-form" className="form-horizontal">

          {/* Name Input */}
          <div className="form-group">
              <input 
                type="text"
                className="form-control color-change"
                id="name"
                placeholder="NAME"
                name="name"
                defaultValue=""
                required=""
              />
          </div>

          {/* Email Input */}
          <div className="form-group">
              <input
                type="email"
                className="form-control color-change"
                id="email"
                placeholder="EMAIL"
                name="email"
                defaultValue=""
                required=""
              />
          </div>

          {/* Message */}
          <textarea 
            className="form-control color-change"
            rows={10}
            placeholder="MESSAGE"
            name="message"
            required=""
            defaultValue={""}
          />

          {/* Send Button */}
          <button
            className="btn-1 graphic2"
            id="submit"
            type="submit"
            value="SEND"
          >
            <div className="alt-send-button">
              {/* <i className="fa fa-paper-plane" /> */}
              <span className="send-text">SEND</span>
            </div>
          </button>

        </form>


        {/* Right contact page */}
        <div className="direct-contact-container">

          {/* Contact List */}
          <ul className="contact-list">

            {/* Location & Icon */}
            <li className="list-item">
              <i className="fa fa-map-marker improv3 fa-2x">
                <span className="contact-text place improv3">Burbank, California</span>
              </i>
            </li>

            {/* Phone & Icon */}
            <li className="list-item">
              <i className="fa fa-phone improv3 fa-2x">
                <span className="contact-text phone">
                  <a className="improv3" href="tel:1-212-555-5555" title="Give me a call">
                    (818) 526-6367
                  </a>
                </span>
              </i>
            </li>

            {/* Email & Icon */}
            <li className="list-item">
              <i className="fa fa-envelope improv3 fa-2x">
                <span className="contact-text gmail">
                  <a className="improv3" href="mailto:#" title="Send me an email">
                    fitwarehouse@gmail.com
                  </a>
                </span>
              </i>
            </li>
          </ul>

          {/* Gap */}
          <hr />

          {/* Social Media List */}
          <ul className="social-media-list">

            {/* Linkedin */}
            <li>
              <a href="https://linkedin.com"  className="contact-icon">
                <i className="fa fa-linkedin" aria-hidden="true" />
              </a>
            </li>

            {/* Github */}
            <li>
              <a href="https://github.com"  className="contact-icon">
                <i className="fa fa-github" aria-hidden="true" />
              </a>
            </li>

            {/* Instagram */}
            <li>
              <a href="https://instagram.com"  className="contact-icon">
                <i className="fa fa-instagram" aria-hidden="true" />
              </a>
            </li>

            {/* Twitter */}
            <li>
              <a href="https://twitter.com"  className="contact-icon">
                <i className="fa fa-twitter" aria-hidden="true" />
              </a>
            </li>
          </ul>

          {/* Gap */}
          <hr />
        </div>

      </div>
    </div>
    </section>

  {/* Google Maps */}
  <div className="mapBox">
  <GoogleMap previewShadow3/>
  </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ContactPage;
