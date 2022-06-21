import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import logo from "./logo.png";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Contact.css";

function Specialist () {
  return (
    <div className="container justify-content-center">
      <div id="specialist" className="specialist">
        <p>Tester</p>
      </div>
    </div>
  )
};

export default Specialist;