import React, { useState, useEffect } from "react";
import { Accordion, Button, Card, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import ListingDescription from "./ListingDescription";
import Axios from "axios";
import "../css/Listings.css";

function Listings() {
  const [listings, setListings] = useState([]);

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

  const listingClicked = async (event) => {
    console.log("Listing clicked");
  };

  const renderCard = (listing, index) => {
    var b64encoded = String.fromCharCode.apply(
      null,
      listing.bike.photos[0].src.data
    );

    return (
      <Card key={index} onClick={listingClicked}>
        {/* <Card.Img
          variant="top"
          src={
            "https://www.bike-magazin.de/__image/a/4825968/alias/xl/a/b/c/1/ar/4-3/bike-test-racebikes-2022-down-country-bike-bmc-fourstroke-01-lt-one.jpg"
          }
        /> */}
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

  return (
    <div className="listings content">
      <div className="row">
        <div className="col-sm-2 filtersPanel">
          <p className="filtersTitle">Filters</p>
          <div className="applyBtnCol">
            <Button className="applyBtn">Apply Filters</Button>
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
                      defaultValue="0"
                      id="minPrice"
                      name="minPrice"
                      placeholder="min"
                    ></input>
                  </div>
                  <div className="form-group col-sm-5">
                    <label for="maxPrice">Max (&euro;)</label>
                    <input
                      className="textField"
                      type="number"
                      min="0"
                      step="10"
                      defaultValue="1000"
                      id="maxPrice"
                      name="maxPrice"
                      placeholder="max"
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
                    <label for="minFrame">Min (cm)</label>
                    <input
                      className="textField"
                      type="number"
                      min="40"
                      max="70"
                      defaultValue="40"
                      id="minFrame"
                      name="minFrame"
                      placeholder="min"
                    ></input>
                  </div>
                  <div className="form-group col-sm-6">
                    <label for="maxFrame">Max (cm)</label>
                    <input
                      className="textField"
                      type="number"
                      min="0"
                      max="70"
                      defaultValue="70"
                      id="maxFrame"
                      name="maxFrame"
                      placeholder="max"
                    ></input>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Color</Accordion.Header>
              <Accordion.Body>
                <Form className="text-left">
                  <Form.Check
                    label="Red"
                    name="color-red"
                    type="checkbox"
                    id="color-red"
                  />
                  <Form.Check
                    label="Green"
                    name="color-green"
                    type="checkbox"
                    id="color-green"
                  />
                  <Form.Check
                    label="Blue"
                    name="color-blue"
                    type="checkbox"
                    id="color-blue"
                  />
                  <Form.Check
                    label="Yellow"
                    name="color-yellow"
                    type="checkbox"
                    id="color-yellow"
                  />
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Gender</Accordion.Header>
              <Accordion.Body>
                <Form.Select>
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
                  <Form.Check
                    label="Brand New"
                    name="condition5"
                    type="checkbox"
                    id={"condition-brandNew"}
                  />
                  <Form.Check
                    label="Good"
                    name="condition4"
                    type="checkbox"
                    id={"condition-good"}
                  />
                  <Form.Check
                    label="Used"
                    name="condition3"
                    type="checkbox"
                    id={"condition-used"}
                  />
                  <Form.Check
                    label="Poor"
                    name="condition2"
                    type="checkbox"
                    id={"condition-poor"}
                  />
                  <Form.Check
                    label="Spare Parts"
                    name="condition1"
                    type="checkbox"
                    id={"condition-spare"}
                  />
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Location</Accordion.Header>
              <Accordion.Body>
                <label for="location">Location</label>
                <input
                  className="textField"
                  type="text"
                  defaultValue="Munich"
                  id="location"
                  name="location"
                ></input>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>Front Gears</Accordion.Header>
              <Accordion.Body>
                <input
                  className="textField"
                  type="number"
                  min="1"
                  max="3"
                  id="rearGears"
                  name="rearGears"
                ></input>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>Rear Gears</Accordion.Header>
              <Accordion.Body>
                <input
                  className="textField"
                  type="number"
                  min="1"
                  max="12"
                  id="frontGears"
                  name="frontGears"
                ></input>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
              <Accordion.Header>Brake Type</Accordion.Header>
              <Accordion.Body>
                <Form.Select>
                  <option>Disk Brake</option>
                  <option>Rim Brake</option>
                </Form.Select>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9">
              <Accordion.Header>Frame Material</Accordion.Header>
              <Accordion.Body>
                <Form.Select>
                  <option>Aluminum</option>
                  <option>Carbon</option>
                  <option>Steel</option>
                </Form.Select>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="10">
              <Accordion.Header>Verification Level</Accordion.Header>
              <Accordion.Body>
                <Form.Select>
                  <option>Frame Number &amp; Condition</option>
                  <option>Frame Number </option>
                  <option>Condition</option>
                  <option>None</option>
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
