import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import emailjs from "@emailjs/browser";
import { Modal, Button } from "react-bootstrap";
import "../css/LoginRegister.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(true);
  const [confirmSent, setConfirmedSent] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setConfirmedSent(false);
  };

  const getPassword = async (event) => {
    event.preventDefault();
    try {
      const results = await Axios.post(
        "http://localhost:3001/forgotPassword/",
        {
          email,
        }
      );
      // get the response from backend, if the user exists than send email
      sendEmail(""); // send email with link to reset psw
    } catch (error) {
      setErrorMessage("You are not registered on this website!");
      console.log(error);
    }
  };

  function sendEmail(data) {
    emailjs.init(data.user_id);
    emailjs.send(data.service_id, data.template_id, "something to send").then(
      (result) => {
        setConfirmedSent(true);
      },
      (error) => {
        alert("An error occurred, Please try again", error.text);
      }
    );
  }

  function ErrorMessage({ message }) {
    return <div className="alert alert-danger">{message}</div>;
  }

  return (
    <div className="loginRegister content" id="login">
      <div className="justify-content-center">
        <div className="login">
          <h2>
            <b>Forgot your password?</b>
          </h2>
          <h4>Enter your email below and we will "remind" you the password</h4>

          <form onSubmit={getPassword}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <input
              className="btn btn-lg btn-block btn-secondary"
              type="submit"
              value="Submit"
            ></input>
          </form>

          {confirmSent === true ? (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title> Message Sent !</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Thanks for contacting Bike House, we will get back to you
                shortly!
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

          {errorMessage.length > 0 ? (
            <ErrorMessage message={errorMessage} />
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
