import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import logo from "../pictures/logo.png";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Contact.css";
import emailjs from "@emailjs/browser";
import emailkey from "../../features/emailKeyContact";
import { Modal, Button } from "react-bootstrap";

function Contact() {
  const [show, setShow] = useState(true);
  const [confirmSent, setConfirmedSent] = useState(false);
  const [index, setIndex] = useState(0);

  const handleClose = () => {
    setShow(false);
    setConfirmedSent(false);
  };

  const handleShow = () => setShow(true);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  function sendEmail(e) {
    e.preventDefault();
    console.log(e.target);

    emailjs.init(emailkey.USER_ID);
    emailjs.sendForm(emailkey.SERVICE_ID, emailkey.TEMPLATE_ID, e.target).then(
      (result) => {
        setConfirmedSent(true);
      },
      (error) => {
        alert("An error occurred, Please try again", error.text);
      }
    );
  }

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

        {confirmSent === true ? (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title> Message Sent !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Thanks for contacting Bike House, we will get back to you shortly!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose} href="/">
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          <p></p>
        )}

        <div id="contactForm" className="row justify-content-center">
          <div className="d-none d-md-block col-md-6">
            <img src={logo} alt="BikeHouse logo" />
          </div>

          <div className="col-md-6">
            <form onSubmit={sendEmail}>
              <div className="form-group row col-md-16">
                <div className="col-md-6">
                  <input
                    required
                    name="firstname"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    required
                    name="lastname"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                <textarea
                  required
                  name="message"
                  className="form-control message"
                  placeholder="Message"
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
                    <a href="bikehouse.feedback@gmail.com">
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
                      Connect with one of our specialists <br />
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
