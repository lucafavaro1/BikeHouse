import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Carousel, Row, Button, Card } from "react-bootstrap";
import "../css/Home.css";
import tarlanImg from "../pictures/tarlan.png";
import lucaImg from "../pictures/luca.png";
import xavierImg from "../pictures/xavier.png";
import kevinImg from "../pictures/kevin.png";

function Home() {
  return (
    <div className="home content">
      <Row>
        <Carousel
          fade
          controls={false}
          indicators={false}
          prevLabel={null}
          nextLabel={null}
          interval={5000}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="First slide"
            />
            <Carousel.Caption className="firstPic">
              <h4>Looking for a used bike, but afraid to get scammed?</h4>
              <p>
                Check out our verified bikes section, we guarantee for the
                quality of the product.
              </p>
              <Button href="/buy"> See our listings</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.10wallpaper.com/wallpaper/1920x1080/1503/vintage_bicycle-High_Quality_HD_Wallpaper_1920x1080.jpg"
              alt="Second slide"
            />

            <Carousel.Caption className="secondPic">
              <h4>Old bikes in garage that are you don't use anymore?</h4>
              <p>Create a profile and start selling now! </p>
              <Button href="/sellbike"> Sell your bike</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://wallpaperaccess.com/full/4074318.jpg"
              alt="Third slide"
            />

            <Carousel.Caption className="thirdPic">
              <h4>Which bike type suits you most?</h4>
              <p>
                Book an appointment with one of our specialists, and we will
                find the best product for you.
              </p>
              <Button href="/specialist"> Book it now</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>
      <Row>
        <Card className="col m-5" border="success" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title> About us </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Discover the team behind BikeHouse
            </Card.Subtitle>
            <Card.Text>
              BikeHouse is a hassle-free online marketplace to help cyclists of
              all levels find their used dream bike of guaranteed quality
            </Card.Text>
            <Card.Text>
              <b>Our Team:</b>
            </Card.Text>
          </Card.Body>
          <Row>
            <Card.Img variant="bottom" src={kevinImg} />
            <Card.Img variant="bottom" src={xavierImg} />
            <Card.Img variant="bottom" src={tarlanImg} />
            <Card.Img variant="bottom" src={lucaImg} />
          </Row>
          <Card.Text className="ourNames">Kevin Xavier Tarlan Luca</Card.Text>
        </Card>

        <Card className="col m-5" border="danger" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title> Our values</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              What we want to provide to the customer
            </Card.Subtitle>
            <Card.Text>
              <p></p>
              <ul>
                <li>Risk reduction</li>
                <li>Verification of bikes and sellers</li>
                <li>Personal assistance</li>
                <li>Consultation</li>
                <li>Secure payments</li>
                <li>Safe deliveries</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="col m-5" border="warning" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Our offer </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Discover all possible services that we offer
            </Card.Subtitle>
            <p></p>
            <Card.Link href="/specialist">
              {" "}
              Talk to a specialist &#128231;
            </Card.Link>
            <p></p>
            <Card.Link href="/buy">Buy a bike &#128690; </Card.Link>
            <p></p>
            <Card.Link href="/buy">
              Buy accessories for your bike &#9086;
            </Card.Link>
            <p></p>
            <Card.Link href="/sellbike">Sell you bike &#128176;</Card.Link>
            <p></p>
            <Card.Link href="/guide">
              Repair the bike yourself &#128295;
            </Card.Link>
            <p></p>
          </Card.Body>
        </Card>
      </Row>
    </div>
  );
}

export default Home;
