import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Home() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  let chosen = 0;

  return (
    <div className="Home">
      {/* <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Welcome to Bike House!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" size="lg" onClick={handleClose}>
            Buyer
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleClose}
            href="/login"
          >
            Seller
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}

export default Home;
