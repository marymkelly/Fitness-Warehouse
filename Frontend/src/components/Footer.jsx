import React from "react";


/*
=======
Footer 
=======
*/


const Footer = () => {

  return (
    <>
      <footer className="footer_area">
      <div className="container">
        <div className="row" style={{ display: 'flex', justifyContent: 'space-around' }}>

          {/* <!-- Single Widget--> */}
          <div className="col-12 col-sm-6 col-lg custom-col" style={{ marginBottom: '2rem' }}>
            <div className="single-footer-widget">

              {/* <!-- Widget Title--> */}
              <h5 className="widget-title improv2">Company</h5>

              {/* <!-- Footer Menu--> */}
              <div className="footer_menu improv2">
                <ul>

                  {/* Linkt To Pages */}
                  <li><a href="/">Home Page</a></li>
                  <li><a href="/product">Products</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* <!-- Single Widget--> */}
          <div className="col-12 col-sm-6 col-lg custom-col" style={{ marginBottom: '2rem' }}>
            <div className="single-footer-widget">

              {/* <!-- Widget Title--> */}
              <h5 className="widget-title improv2">Products</h5>

              {/* <!-- Footer Menu--> */}
              <div className="footer_menu improv2">
                <ul>

                  {/* Linkt To Categories */}
                  <li><a href="#">Martial Arts</a></li>
                  <li><a href="#">Equipment</a></li>
                  <li><a href="#">Outdoor</a></li>
                  <li><a href="#">Other</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }} className="improv2">Copyright © 2023. All Right reserved.</p>
      
      {/* Social Media */}
      <div className="footer_social_area" style={{ display: 'flex', justifyContent: 'center' }} >
              <a href="https://linkedin.com" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook"><i className="fa fa-linkedin"></i></a>
              <a href="https://github.com" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pinterest"><i className="fa fa-github"></i></a>
              <a href="https://instagram.com" data-toggle="tooltip" data-placement="top" title="" data-original-title="Skype"><i className="fa fa-instagram"></i></a>
              <a href="https://twitter.com" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter"><i className="fa fa-twitter"></i></a>
      </div>
    </footer>

    </>
  );
};

export default Footer;
