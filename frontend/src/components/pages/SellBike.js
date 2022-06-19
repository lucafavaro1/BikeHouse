import { Button, Row, Nav, Card, Modal } from "react-bootstrap";
import { Route } from "react-router";
import React, { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import "../css/SellBike.css";
import DropBox from "../../features/Dropbox";
import ShowImage from "../../features/ShowImage";

function SellBike() {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [frameSize, setFrameSize] = useState("");
  const [frameMaterial, setFrameMaterial] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [frontGears, setFrontGears] = useState(0);
  const [rearGears, setRearGears] = useState(0);
  const [brakeType, setBrakeType] = useState("");
  const [description, setDescription] = useState("");
  const [conditionVerification, setConditionVerification] = useState(false);
  const [frameVerification, setFrameVerification] = useState(false);
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: index, src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  function renderSwitch(param) {
    switch (param) {
      case 1:
        return (
          <div className="bike_details">
            <Form>
              <div className="initialText">
                <h2> Describe you bike in detail ... </h2>
                <p>
                  {" "}
                  All fields have to be completed to procede to the next step.
                </p>
              </div>
              <Row>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Brand"
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Model"
                    onChange={(e) => {
                      setModel(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Location"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    className="col"
                    style={{ height: 38 + "px" }}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    <option>Select Type</option>
                    <option value="Child">Child</option>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="Unisex">Unisex</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    className="col"
                    style={{ height: 38 + "px" }}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option>Select Gender</option>
                    <option value="Child">Child</option>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="Unisex">Unisex</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Select
                    className="col"
                    style={{ height: 38 + "px" }}
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                  >
                    <option>Select the main bike's color</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Gray">Gray</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Purple">Purple</option>
                    <option value="Brown">Brown</option>
                    <option value="Red">Red</option>
                    <option value="Orange">Orange</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Frame Size</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Frame Size"
                    onChange={(e) => {
                      setFrameSize(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Frame Material</Form.Label>
                  <Form.Select
                    className="col"
                    style={{ height: 38 + "px" }}
                    onChange={(e) => {
                      setFrameMaterial(e.target.value);
                    }}
                  >
                    <option>Select Frame Material</option>
                    <option value="Aluminium">Aluminium</option>
                    <option value="Carbon">Carbon</option>
                    <option value="Syeel">Steel</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="col mt-3 mb-3"></Form.Group>
              </Row>

              <Row>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Front Gears</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    placeholder="Enter number of front gears"
                    onChange={(e) => {
                      setFrontGears(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Rear Gears</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    placeholder="Enter number or rear gears"
                    onChange={(e) => {
                      setRearGears(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="col mt-3 mb-3"></Form.Group>
              </Row>
              <Row>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Brake Type</Form.Label>
                  <Form.Select
                    className="col"
                    style={{ height: 38 + "px" }}
                    onChange={(e) => {
                      setBrakeType(e.target.value);
                    }}
                  >
                    <option>Select Brake Type</option>
                    <option value="Disk">Disk Brake</option>
                    <option value="Rim">Rim Brake</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="col mt-3 mb-3"></Form.Group>
                <Form.Group className="col mt-3 mb-3"></Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Form.Group>
              <Row>
                <Form.Group className="col mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="Enter the amount"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="col mt-3 mb-3"></Form.Group>
                <Form.Group className="col mt-3 mb-3"></Form.Group>
              </Row>
              <hr></hr>
              <Row>
                <Button
                  href="/"
                  className="col mt-3 mb-3 custom"
                  variant="secondary"
                >
                  {" "}
                  Cancel{" "}
                </Button>
                <p className="col mt-3 mb-3"></p>
                <p className="col mt-3 mb-3"></p>
                <p className="col mt-3 mb-3"></p>

                <Button
                  className="col mt-3 mb-3 next"
                  onClick={() => setStep(2)}
                >
                  Next
                </Button>
              </Row>
            </Form>
          </div>
        );
      case 2:
        return (
          <div className="upload_pictures">
            <Modal.Dialog className="modal_verification">
              <Modal.Title>&#9888;</Modal.Title>
              <Modal.Body>
                <p>Verification affects the listing order.</p>
              </Modal.Body>
            </Modal.Dialog>

            <Modal.Dialog className="photo_guide">
              <Modal.Title>&#9733;</Modal.Title>
              <Modal.Body>
                <p>
                  <a href="/photo_guide" target="_blank">
                    Click here
                  </a>{" "}
                  to see our photo guide
                </p>
              </Modal.Body>
            </Modal.Dialog>

            <div className="initialText">
              <h2>How does it look? </h2>
              <hr></hr>
              <p>
                {" "}
                Upload pictures and videos of your bike. Ads with more pictures
                are usually the most viewed ones!
              </p>{" "}
              <p>
                {" "}
                If you wish your bike condition to be verified by us, make sure
                the following parts of the bike are visible on the images:
                <ul>
                  <li>Front and back wheel (separately)</li>
                  <li>Brake pads/disks (front and rear) </li>
                  <li>Front and rear gears (separately) </li>
                  <li>Frame (at least one picture per bike side) </li>
                </ul>
                &#9888; The only accepted formats for images are .png and .jpeg
                &#9888;
              </p>
            </div>
            <div className="dragndrop">
              <DropBox onDrop={onDrop} />
              <ShowImage images={images} />
            </div>
            <div className="initialText">
              <h3>Verification</h3>
              <hr></hr>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  id="condition_verification"
                  onClick={() =>
                    setConditionVerification(!conditionVerification)
                  }
                />
                <Form.Check.Label>
                  {" "}
                  I want an expert to verify the <b>condition</b> of my bike
                </Form.Check.Label>
              </Form.Check>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  id="frame_verification"
                  onClick={() => setFrameVerification(!frameVerification)}
                />
                <Form.Check.Label>
                  {" "}
                  I want an expert to verify the <b>frame number</b> of my bike
                </Form.Check.Label>
              </Form.Check>
              <p></p>
            </div>
            <hr></hr>
            <Row>
              <Button
                href="/"
                className="col mt-3 mb-3 custom"
                variant="secondary"
              >
                {" "}
                Cancel{" "}
              </Button>
              <p className="col mt-3 mb-3"></p>
              <p className="col mt-3 mb-3"></p>

              <Button
                className="col mt-3 mb-3 mr-3 back"
                variant="secondary"
                onClick={() => setStep(step - 1)}
              >
                {" "}
                Back{" "}
              </Button>
              <Button className="col mt-3 mb-3 next" onClick={() => setStep(3)}>
                Next
              </Button>
            </Row>
          </div>
        );
      case 3:
        return (
          <div className="almost_done">
            <div className="initialText">
              <h2>Almost done... </h2>
              <hr></hr>
              <p>Your listing is ready to be published.</p>
              <p>
                Note that, in case you selected any verification, the listing
                will be published as soon as the verification team has processed
                this request.
              </p>
            </div>
            <Card className="text-left mt-5 mb-5 card">
              <Card.Body>
                <Card.Img
                  className="rocket"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQax851bywNSEElwuoJVJMYpAVwvL2FMoaWnAkjVkxq1GRyobNSb0u3JlbV8e_UAPlNcE8&usqp=CAU"
                />
                <Card.Title>Special Boosting</Card.Title>
                <Card.Text>
                  Would you like to sell your bike faster? Boost your listing
                  for only €5!
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => alert("Implement payment")}
                >
                  Boost Now
                </Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                In case you change your mind, you can also boost your Ad later
                from your listing{" "}
              </Card.Footer>
            </Card>
            <Row>
              <Button
                href="/"
                className="col mt-3 mb-3 custom"
                variant="secondary"
              >
                {" "}
                Cancel{" "}
              </Button>
              <p className="col mt-3 mb-3"></p>
              <p className="col mt-3 mb-3"></p>

              <Button
                className="col mt-3 mb-3 mr-3 back"
                variant="secondary"
                onClick={() => setStep(step - 1)}
              >
                {" "}
                Back{" "}
              </Button>
              <Button
                className="col mt-3 mb-3 next"
                href="/"
                onClick={() => alert("To implement my listing page in profile")}
              >
                Submit
              </Button>
            </Row>
          </div>
        );
      default:
        return <p> Something went wrong, please refresh the page</p>;
    }
  }

  return (
    <div className="sellBike">
      <Nav justify variant="tabs" activeKey={step} className="navbar_state">
        <Nav.Item>
          <Nav.Link eventKey="1">1. Bike Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2">2. Upload Pictures</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3">3. Done!</Nav.Link>
        </Nav.Item>
      </Nav>

      {renderSwitch(step)}
    </div>
  );
}

export default SellBike;
