import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../css/Footer.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Contact.css";

function Footer() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="footer">
      <div id="bottomText" className="bottomText">
        <div className="row justify-content-center">
          <div id="contactCard" className="contactCard col-12 col-md-4">
            <h5>Contact Information</h5>
            <div className="row">
              <div className="d-none d-md-block col-2">
                <i className="bi bi-geo-alt"></i>
                <br />
                <br />
                <br />
                <i className="bi bi-telephone"></i>
                <br />
                <i className="bi bi-envelope"></i>
                <br />
              </div>
              <div className="col-10 ">
                <p>
                  Boltzmannstraße 3,
                  <br />
                  85748 Garching bei München,
                  <br />
                  Germany
                  <br />
                  <a href="tel: +49 1234 567890">+49 1234 567890</a>
                  <br />
                  <a
                    href="" // just to make it blue
                    onClick={() =>
                      (window.location = "mailto:bikehouse.feedback@gmail.com")
                    }
                  >
                    bikehouse.feedback@gmail.com
                  </a>
                  <br />
                </p>
              </div>
            </div>
          </div>

          <div id="socialMedia" className="socialMedia col-12 col-md-3">
            <div className="row justify-content-center">
              <div className="icon col-4">
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className=" bi bi-youtube"></i>
                </a>
              </div>
              <div className="icon col-4">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-facebook"></i>
                </a>
              </div>
              <div className="icon col-4">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <div id="helpCard" className="helpCard row col-12 col-md-5">
            <h5>How can we help you?</h5>
            <Carousel
              fade
              prevLabel={null}
              nextLabel={null}
              prevIcon={
                <span aria-hidden="true" className="icon bi bi-arrow-left" />
              }
              nextIcon={
                <span aria-hidden="true" className="icon bi bi-arrow-right" />
              }
              pause="hover"
              interval="3500"
              indicators={false}
              activeIndex={index}
              onSelect={handleSelect}
            >
              <Carousel.Item>
                <a className="" href="/specialist">
                  Talk to a Specialist
                  <br />
                  <p className="">
                    Connect with one of our specialists <br />
                  </p>
                  <p className="d-none d-md-block">to find your dream bike.</p>
                  <br />
                </a>
              </Carousel.Item>
              <Carousel.Item>
                <a className="" href="/guide">
                  Fix your Bike
                  <br />
                  <p className="">
                    Read the DIY Guide to fix your bike
                    <br />
                  </p>
                  <p className="d-none d-md-block">
                    or to know of essential maintenance tips.{" "}
                  </p>
                  <br />
                </a>
              </Carousel.Item>
              <Carousel.Item>
                <a className="" href="mailto:careers@bikehouse.com">
                  Careers
                  <br />
                  <p className="">
                    Would you like to work with us?
                    <br /> Shoot us a mail!
                  </p>
                  <br />
                </a>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
