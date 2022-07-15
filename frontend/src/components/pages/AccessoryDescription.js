import React from "react";
import "../css/AccessoryDescription.css"
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

function AccessoryDescription(props) {
	return (
		<div className="accessoryDesc">
			<Row >
				<span className="accName">{props.accessory.brand}</span>
			</Row>
			<Row >
				<span className="accName">{props.accessory.name}</span>
			</Row>
			<Row className="mt-2">
				<Col className="p-0">
					<span className="accPrice">&euro; {props.accessory.price}</span>
				</Col>

				<Col className="p-0">
					<button className="btn float-right addToCartBtn"><FontAwesomeIcon icon={faCartPlus} size="xl" /></button>
				</Col>
			</Row>
		</div>
	);
}

export default AccessoryDescription;
