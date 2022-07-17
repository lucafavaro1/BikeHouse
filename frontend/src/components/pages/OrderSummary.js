import React, { useState, useEffect, useRef } from "react";
import "../css/OrderSummary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function OrderSummary() {
	const [order, setOrder] = useState({});

	/** Returns an order instance where foreign keys are replaced with actual objects */
	async function getOrder() {

	}
	
	useEffect(() => {
		getOrder();
	}, []);

	return (
		<div className="orderSummary content">
			<div className="thankYou">
				<div className="row justify-content-center">
					<FontAwesomeIcon icon={faCircleCheck} size="l" color="#4dbd60" />
				</div>
				<div className="row mt-3 justify-content-center">
					<h1>Thank you!</h1>
				</div>
				<div className="row mt-1 justify-content-center">
					<span>Your order has been placed. You can see the details below...</span>
				</div>
				<hr></hr>
			</div>



		</div>
	)
}

export default OrderSummary