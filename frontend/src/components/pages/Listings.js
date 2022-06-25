import React, { useState, useEffect, useRef } from "react";
import { Accordion, Button, Card, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import ListingDescription from "./ListingDescription";
import Axios from "axios";
import "../css/Listings.css";

function Listings() {
  const [listings, setListings] = useState([]);
  const parameters = useRef({})

  const colors = ["Red", "Green", "Black", "Yellow"]
  const conditions = ["Brand New", "Good", "Used", "Poor", "Spare Parts"]

  useEffect(() => {
    async function getListings() {
      try {
        const response = await Axios.get("http://localhost:3001/listing");
        setListings(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getListings();
  }, []);

  /** Called when a listing is clicked */
  const listingClicked = async (event) => {
    console.log("Listing clicked");
  };

  /** Called when the apply button is clicked */
  const applyFilterClicked = async (event) => {
    try {
      const response = await Axios.get("http://localhost:3001/listing", { params: parameters.current });
      setListings(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  /** Called when any of the accordion items is changed*/
  function handleFilterChange(eventObject) {
    // console.log(eventObject.target)
    // console.log(eventObject.target.value)

    let newValue = eventObject.target.value
    let targetId = eventObject.target.id

    if (targetId == "minPrice") {
      parameters.current.minPrice = parameters.current.minPrice || {};
      parameters.current.minPrice = newValue;
    }
    else if (targetId == "maxPrice") {
      parameters.current.maxPrice = parameters.current.maxPrice || {};
      parameters.current.maxPrice = newValue;
    }
    else if (targetId == "minFrameSize") {
      parameters.current.minFrameSize = parameters.current.minFrameSize || {};
      parameters.current.minFrameSize = newValue;
    }
    else if (targetId == "maxFrameSize") {
      parameters.current.maxFrameSize = parameters.current.maxFrameSize || {};
      parameters.current.maxFrameSize = newValue;
    }
    else if (targetId.includes("color")) {
      parameters.current.colors = parameters.current.colors || [];

      if (parameters.current.colors.includes(eventObject.target.name)) { // remove if exists
        parameters.current.colors = parameters.current.colors.filter(item => item !== eventObject.target.name)
      }
      else { // add if doesn't exist
        parameters.current.colors = [...parameters.current.colors, eventObject.target.name];
      }
    }
    else if (targetId == "gender") {
      parameters.current.gender = parameters.current.gender || {};

      if (newValue !== '') {
        parameters.current.gender = newValue;
      }
      else {
        delete parameters.current.gender
      }
    }
    else if (targetId.includes("condition")) {
      parameters.current.conditions = parameters.current.conditions || [];

      let conditionIndex = 5 - +eventObject.target.name

      if (parameters.current.conditions.includes(conditionIndex)) { // remove if exists
        parameters.current.conditions = parameters.current.conditions.filter(item => item !== conditionIndex)
      }
      else { // add if doesn't exist
        parameters.current.conditions = [...parameters.current.conditions, conditionIndex];
      }
    }
    else if (targetId == "location") {
      parameters.current.location = parameters.current.location || {};
      parameters.current.location = newValue;
    }
    else if (targetId == "rearGears") {
      parameters.current.rearGears = parameters.current.rearGears || {};
      parameters.current.rearGears = newValue;
    }
    else if (targetId == "frontGears") {
      parameters.current.frontGears = parameters.current.frontGears || {};
      parameters.current.frontGears = newValue;
    }
    else if (targetId == "brakeType") {
      parameters.current.brakeType = parameters.current.brakeType || {};

      if (newValue !== '') {
        parameters.current.brakeType = newValue;
      }
      else {
        delete parameters.current.brakeType
      }
    }
    else if (targetId == "frameMaterial") {
      parameters.current.frameMaterial = parameters.current.frameMaterial || {};

      if (newValue !== '') {
        parameters.current.frameMaterial = newValue;
      }
      else {
        delete parameters.current.frameMaterial
      }
    }
    else if (targetId == "verification") {
      parameters.current.verification = parameters.current.verification || {};

      if (newValue !== '') {
        parameters.current.verification = newValue;
      }
      else {
        delete parameters.current.verification
      }
    }

    console.log(parameters.current)
  }

  /** Renders a new Card component for each listing */
  const renderCard = (listing, index) => {
    var b64encoded = String.fromCharCode.apply(
      null,
      listing.bike.photos[0].src.data
    );

    return (
      <Card key={index} onClick={listingClicked}>
        <Card.Img variant="top" src={b64encoded} />

        {listing.isBoosted ? (
          <div className="boostIcon">
            <FontAwesomeIcon icon={faRocket} size="2x" />
          </div>
        ) : (
          <span></span>
        )}

        <Card.Body>
          <Card.Text>
            <ListingDescription listing={listing}></ListingDescription>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  /** Renders a new Form.Check component for each bike color */
  const renderColorCheckbox = (color, index) => {
    return (
      <Form.Check
        label={color}
        name={color}
        type="checkbox"
        id={"color-" + color}
        onChange={handleFilterChange}
      />
    );
  };

  /** Renders a new Form.Check component for each bike condition */
  const renderConditionCheckbox = (condition, index) => {
    return (
      <Form.Check
        label={condition}
        name={index}
        type="checkbox"
        id={"condition-" + index}
        onChange={handleFilterChange}
      />
    );
  };

  return (
    <div className="listings content">
      <div className="row">
        <div className="col-sm-2 filtersPanel">
          <p className="filtersTitle">Filters</p>
          <div className="applyBtnCol">
            <Button className="applyBtn" onClick={applyFilterClicked}>Apply Filters</Button>
          </div>
          <Accordion defaultActiveKey="0" alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Price</Accordion.Header>
              <Accordion.Body>
                <div className="row justify-content-center">
                  <div className="form-group col-sm-5">
                    <label for="minPrice">Min (&euro;)</label>
                    <input
                      className="textField"
                      type="number"
                      min="0"
                      step="10"
                      id="minPrice"
                      name="minPrice"
                      placeholder="min"
                      onWheel={(e) => e.target.blur()} // prevents default input scroll behavior
                      onChange={handleFilterChange}
                    ></input>
                  </div>
                  <div className="form-group col-sm-5">
                    <label for="maxPrice">Max (&euro;)</label>
                    <input
                      className="textField"
                      type="number"
                      min="0"
                      step="10"
                      id="maxPrice"
                      name="maxPrice"
                      placeholder="max"
                      onWheel={(e) => e.target.blur()}
                      onChange={handleFilterChange}
                    ></input>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Frame Size</Accordion.Header>
              <Accordion.Body>
                <div className="row justify-content-center">
                  <div className="form-group col-sm-6">
                    <label for="minFrameSize">Min (cm)</label>
                    <input
                      className="textField"
                      type="number"
                      min="40"
                      max="70"
                      id="minFrameSize"
                      name="minFrameSize"
                      placeholder="min"
                      onWheel={(e) => e.target.blur()}
                      onChange={handleFilterChange}
                    ></input>
                  </div>
                  <div className="form-group col-sm-6">
                    <label for="maxFrameSize">Max (cm)</label>
                    <input
                      className="textField"
                      type="number"
                      min="0"
                      max="70"
                      id="maxFrameSize"
                      name="maxFrameSize"
                      placeholder="max"
                      onWheel={(e) => e.target.blur()}
                      onChange={handleFilterChange}
                    ></input>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Color</Accordion.Header>
              <Accordion.Body>
                <Form className="text-left">
                  {colors.map(renderColorCheckbox)}
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Gender</Accordion.Header>
              <Accordion.Body>
                <Form.Select id="gender" onChange={handleFilterChange}>
                  <option selected> </option>
                  <option>Man</option>
                  <option>Woman</option>
                  <option>Child</option>
                  <option>Unisex</option>
                </Form.Select>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Condition</Accordion.Header>
              <Accordion.Body>
                <Form className="text-left">
                  {conditions.map(renderConditionCheckbox)}
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Location</Accordion.Header>
              <Accordion.Body>
                <input
                  className="textField"
                  type="text"
                  id="location"
                  name="location"
                  onChange={handleFilterChange}
                ></input>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>Rear Gears</Accordion.Header>
              <Accordion.Body>
                <input
                  className="textField"
                  type="number"
                  min="1"
                  max="3"
                  id="rearGears"
                  name="rearGears"
                  onWheel={(e) => e.target.blur()}
                  onChange={handleFilterChange}
                ></input>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>Front Gears</Accordion.Header>
              <Accordion.Body>
                <input
                  className="textField"
                  type="number"
                  min="1"
                  max="12"
                  id="frontGears"
                  name="frontGears"
                  onWheel={(e) => e.target.blur()}
                  onChange={handleFilterChange}
                ></input>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
              <Accordion.Header>Brake Type</Accordion.Header>
              <Accordion.Body>
                <Form.Select id="brakeType" onChange={handleFilterChange}>
                  <option selected> </option>
                  <option>Disk</option>
                  <option>Rim</option>
                </Form.Select>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9">
              <Accordion.Header>Frame Material</Accordion.Header>
              <Accordion.Body>
                <Form.Select id="frameMaterial" onChange={handleFilterChange}>
                  <option selected> </option>
                  <option>Aluminium</option>
                  <option>Carbon</option>
                  <option>Steel</option>
                </Form.Select>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="10">
              <Accordion.Header>Verification Level</Accordion.Header>
              <Accordion.Body>
                <Form.Select id="verification" onChange={handleFilterChange}>
                  <option selected> </option>
                  <option value="conditionAndFrame">Frame Number &amp; Condition</option>
                  <option value="frame">Frame Number </option>
                  <option value="condition">Condition</option>
                  <option value="none">None</option>
                </Form.Select>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        <div className="col listingsPanel">
          <Row xs={3} md={4}>
            {listings.map(renderCard)}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Listings;
