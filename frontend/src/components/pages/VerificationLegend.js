import React from "react";
import ConditionIndicator from "../reusable/ConditionIndicator";
import "../css/VerificationLegend.css";

function VerificationLegend() {
	return (
		<div className="verificationLegend">
			<div className="row">
				<div className="starContainer">
					<ConditionIndicator numOfStars={5} ></ConditionIndicator>
				</div>
				<span>Brand New</span>
			</div>
			
			<div className="row">
				<div className="starContainer">
					<ConditionIndicator numOfStars={4} ></ConditionIndicator>
				</div>
				<span>Good</span>
			</div>
			
			<div className="row">
				<div className="starContainer">
					<ConditionIndicator numOfStars={3} ></ConditionIndicator>
				</div>
				<span>Used</span>
			</div>
			
			<div className="row">
				<div className="starContainer">
					<ConditionIndicator numOfStars={2} ></ConditionIndicator>
				</div>
				<span>Poor</span>
			</div>
			
			<div className="row">
				<div className="starContainer">
					<ConditionIndicator numOfStars={1} ></ConditionIndicator>
				</div>
				<span>Spare Parts</span>
			</div>
			
			<div className="row">
				<div className="starContainer">
					<ConditionIndicator numOfStars={0} ></ConditionIndicator>
				</div>
				<span>Not verified</span>
			</div>
		</div>
	)
}

export default VerificationLegend;
