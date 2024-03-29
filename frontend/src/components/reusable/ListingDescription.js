//resuable functional component to load the listing descriptions for each listing card

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";
import "../css/ListingDescription.css";
import ConditionIndicator from "./ConditionIndicator.js";

function ListingDescription(props) {
  return (
    <div className="listingDesc">
      <Row className="ml-0 mr-0">
        <Col className="text-left">
          <p className="bikeName">
            {props.listing.bike.brand} {props.listing.bike.model}
          </p>
        </Col>
        <Col className="text-right">
          <FontAwesomeIcon icon={faLocationDot} />
          <span> {props.listing.bike.location}</span>
        </Col>
      </Row>

      <Row className="ml-0 mr-0">
        <Col className="text-left">
          <span>{props.listing.finalPrice} &euro;</span>
        </Col>
        <Col className="text-right">
          <ConditionIndicator
            numOfStars={props.listing.bike.condition}
            size={"sm"}
          ></ConditionIndicator>
        </Col>
      </Row>
    </div>
  );
}

export default ListingDescription;
