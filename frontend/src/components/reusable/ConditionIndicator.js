// reusable component function to display the condition of a bike as stars

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

function ConditionIndicator(props) {
  let stars = [];

  for (var i = 1; i <= 5; i++) {
    if (i <= props.numOfStars) {
      stars.push(
        <FontAwesomeIcon
          icon={faSolidStar}
          size={props.size ? props.size : "1x"}
          key={i}
        />
      );
    } else {
      stars.push(
        <FontAwesomeIcon icon={faStar} size={props.size ? props.size : "1x"} key={i}/>
      );
    }
  }

  return <div className="d-inline-flex">{stars}</div>;
}

export default ConditionIndicator;
