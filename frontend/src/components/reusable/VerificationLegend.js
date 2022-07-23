// reusable component function to display the verification level of a bike as labels

import React from "react";
import "../css/VerificationLegend.css";
import ConditionIndicator from "../reusable/ConditionIndicator";

function VerificationLegend() {
  return (
    <div className="verificationLegend">
      <div className="row">
        <div className="starContainer">
          <ConditionIndicator numOfStars={5}></ConditionIndicator>
        </div>
        <span>Brand New</span>
      </div>

      <div className="row">
        <div className="starContainer">
          <ConditionIndicator numOfStars={4}></ConditionIndicator>
        </div>
        <span>Good</span>
      </div>

      <div className="row">
        <div className="starContainer">
          <ConditionIndicator numOfStars={3}></ConditionIndicator>
        </div>
        <span>Decent</span>
      </div>

      <div className="row">
        <div className="starContainer">
          <ConditionIndicator numOfStars={2}></ConditionIndicator>
        </div>
        <span>Bad</span>
      </div>

      <div className="row">
        <div className="starContainer">
          <ConditionIndicator numOfStars={1}></ConditionIndicator>
        </div>
        <span>Spare Parts</span>
      </div>

      <div className="row">
        <div className="starContainer">
          <ConditionIndicator numOfStars={0}></ConditionIndicator>
        </div>
        <span>Not verified</span>
      </div>
    </div>
  );
}

export default VerificationLegend;
