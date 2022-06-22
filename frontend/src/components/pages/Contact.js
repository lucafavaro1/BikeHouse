import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import logo from "./logo.png";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Contact.css";

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const navigate = useNavigate();

  const storeMessage = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/createFeedback", {
      firstName,
      lastName,
      email,
      message,
    })
      .then((response) => {
        console.log(response.data.message);

        setFirstName(response.data.firstName);
        console.log(`Register in feedback: ${firstName}`);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="content container justify-content-center">
      <div id="contact" className="contact">
        <div className="topText">
          <h5>
            <b>Got a Question?</b>
          </h5>
          <h1>
            <b>Contact BikeHouse</b>
          </h1>
          <p>
            We're here to help and answer any question you might have. We look
            forward to hearing from you 🙂
          </p>
        </div>

        <div id="contactForm" className="row justify-content-center">
          <div className="d-none d-md-block col-md-6">
            <img
              src={logo}
              alt="BikeHouse logo"
              height={350}
              width={350}
              style={{ "margin-top": "60px" }}
            />
          </div>

          <div className="col-md-6">
            <form onSubmit={storeMessage}>
              <div className="form-group row col-md-16">
                <div className="col-md-6">
                  <input
                    required
                    className="form-control"
                    placeholder="First Name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    required
                    className="form-control"
                    placeholder="Last Name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  required
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <textarea
                  required
                  className="form-control"
                  placeholder="Message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </div>

              <button
                className="btn btn-md btn-block btn-success"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

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
                    <a href="mailto:support@bikehouse.com">
                      support@bikehouse.com
                    </a>
                    <br />
                  </p>
                </div>
              </div>
            </div>

            <div id="socialMedia" className="socialMedia col-12 col-md-3">
              <div className="row justify-content-center">
                <div className="icon col-4">
                  <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                    <i className=" bi bi-youtube"></i>
                  </a>
                </div>
                <div className="icon col-4">
                  <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                    <i className="bi bi-facebook"></i>
                  </a>
                </div>
                <div className="icon col-4">
                  <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            <div id="helpCard" className="helpCard row col-12 col-md-5">
              <h5>How can we help?</h5>
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
                      Connect with one of our specialists <br/> 
                    </p>
                    <p className="d-none d-md-block">
                      to find your dream bike.
                    </p>
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
    </div>
  );
}

export default Contact;
