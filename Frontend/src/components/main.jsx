import React from "react";

// Carousel Preview
import Carousel from 'react-bootstrap/Carousel';

// AOS Text Effect
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect} from "react";


/*
===========================
Home Page Carousel Preview
===========================
*/


const Home = () => {

  // AOS Text Effect 
  useEffect(() => {
      AOS.init();
  }, [])
  return (
    <>
      {/* Header */}
      <h1 className="text-center mt-5 mb-5 improv shineGlow" data-aos="zoom-in">Welcome Back!</h1>

        {/* Carousel Container */}
        <div className="carousel-container previewShadow3" style={{ width: '90%', margin: 'auto', borderRadius: '1rem' }}>
          <Carousel  className="carousel-borders" prevIcon={<i className="fa fa-caret-square-o-left previewArrow"></i>} nextIcon={<i className="fa fa-caret-square-o-right previewArrow"></i>}>
            
            {/* Carousel 1 */}
            <Carousel.Item interval={3000}>

              {/* Image */}
              <img
                className="d-block w-100"
                src="./assets/Adcc.jpg"
                alt="First slide"
                style={{ width: '30vw', height: '70vh', objectFit: 'cover' }}/>

              {/* Text */}
              <Carousel.Caption>
                <h3 className="text-center mt-5 improv">Proud Sponsor Of ADCC 2022</h3>
              </Carousel.Caption>
            </Carousel.Item>

            {/* Carousel 2 */}
            <Carousel.Item interval={3000}>

              {/* Image */}
              <img
                className="d-block w-100"
                src="./assets/Rei.jpg"
                alt="Second slide"
                style={{ width: '30vw', height: '70vh', objectFit: 'cover' }}/>

              {/* Text */}
              <Carousel.Caption>
                <h3 className="text-center mt-5 improv">In affiliation with REI</h3>
              </Carousel.Caption>
            </Carousel.Item>

            {/* Carousel 3 */}
            <Carousel.Item interval={3000}>

              {/* Image */}
              <img
                className="d-block w-100"
                src="./assets/Shoyo6.jpg"
                alt="Third slide"
                style={{ width: '30vw', height: '70vh', objectFit: 'cover' }}/>

              {/* Text */}
              <Carousel.Caption>
                <h3 className="text-center mt-5 improv">Introducing our latest brand</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
    </>
  );
}

// AOS Text Effect
AOS.init({
  duration: 1200,
})

export default Home;