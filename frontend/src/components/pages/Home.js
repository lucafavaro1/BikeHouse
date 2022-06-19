import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Carousel } from "react-bootstrap";
import "../css/Home.css";

function Home() {
  return (
    <div className="home row">
      <div className="col"></div>
      <div className="col-6">
        <Carousel
          indicators={false}
          prevLabel={null}
          nextLabel={null}
          pause="hover"
        >
          <Carousel.Item interval={3000}>
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
        <p>
          {" "}
          This is the homepage and we will write something here in the future
          <p></p>
          These lines are supposed to keep the footer down ... otherwise it
          sticks to the bottom of the picture
          <p></p>
        </p>
      </div>

      <div className="col"></div>
    </div>
  );
}

export default Home;
