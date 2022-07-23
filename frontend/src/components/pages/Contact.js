// function to load the contact page

import React, { useState } from "react";
import logo from "../pictures/logo.png";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Contact.css";
import emailjs from "@emailjs/browser";
import emailkey from "../../features/emailKeys";
import { Modal, Button } from "react-bootstrap";

function Contact() {
  const [show, setShow] = useState(true);
  const [confirmSent, setConfirmedSent] = useState(false);
  const [index, setIndex] = useState(0);

  const handleClose = () => {
    setShow(false);
    setConfirmedSent(false);
  };

  //function to send email on form submission with feedback
  function sendEmail(e) {
    e.preventDefault();
    console.log(e.target);

    emailjs.init(emailkey.USER_ID);
    emailjs
      .sendForm(emailkey.SERVICE_ID, emailkey.TEMPLATE_ID_CONTACT, e.target)
      .then(
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
          <Modal
            show={show}
            onHide={handleClose}
            style={{ marginTop: 200 + "px" }}
          >
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
      </div>
    </div>
  );
}

export default Contact;
