import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import "../css/Home.css";

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

      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Here write the caption of the photo</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/37836/silhouette-fitness-bless-you-bike-37836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Here write the caption of the photo</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/71104/utah-mountain-biking-bike-biking-71104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Here write the caption of the photo</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
