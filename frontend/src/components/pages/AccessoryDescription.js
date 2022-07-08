import React from "react";
import "../css/AccessoryDescription.css"
import { Row } from "react-bootstrap";

function AccessoryDescription(props) {
	return (
		<div className="accessoryDesc">
			<Row >
				<span className="accName">{props.accessory.brand}</span>
			</Row>
			<Row >
				<span className="accName">{props.accessory.name}</span>
			</Row>
		</div>
	);
}

export default AccessoryDescription;
