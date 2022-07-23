// function to load the photo guide page

import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/PhotoGuide.css";

function PhotoGuide() {
  return (
    <div className="photoguide">
      <div class="guideNavbar">
        <a class="list-group-item list-group-item-action" href="#wheels">
          <b>Wheels pictures</b>
        </a>
        <a class="list-group-item list-group-item-action" href="#brake">
          <b>Brake pads or disks picture</b>
        </a>
        <a class="list-group-item list-group-item-action" href="#gears">
          <b>Front/Rear gears pictures</b>
        </a>
        <a class="list-group-item list-group-item-action" href="#frame">
          <b>Frame pictures</b>
        </a>
        <a class="list-group-item list-group-item-action" href="#frame_number">
          <b>Frame number (if needed)</b>
        </a>
      </div>
      <div className="page">
        <div
          data-bs-spy="scroll"
          data-bs-bs-target=".guideNavbar"
          data-offset="0"
          tabindex="0"
        >
          <h2>
            {" "}
            Picture examples of the parts that we require to be photographed
          </h2>
          <p>
            {" "}
            Please take photos with enough ambient light, in focus, and zoomed
            on a part of the bike
          </p>
          <h3 id="wheels" style={{ marginTop: 10 + "px" }}>
            <b>Wheels pictures</b>
          </h3>
          <p>
            <img
              alt="Wheels"
              src="https://cdn.road.cc/sites/default/files/styles/main_width/public/parcours-strade-wheelset-1.jpg"
            ></img>
          </p>
          <h3
            id="brake"
            style={{ marginTop: 30 + "px", marginBottom: 15 + "px" }}
          >
            <b>Brake pads or disks pictures</b>
          </h3>
          <h3 style={{ marginBottom: 15 + "px" }}>
            <img
              alt="Disk Brakes"
              src="https://3.bp.blogspot.com/-qHAqJXC8o5c/WZ7rNPiOgSI/AAAAAAAANIY/Iz8J3CSXQrgWatHWyWb4wVypJlwvvn9PwCLcBGAs/s1600/IMG_1783.JPG"
            ></img>
          </h3>
          <h3 style={{ marginBottom: 15 + "px" }}>
            <img
              alt="Brake Pads"
              src="http://www.montaguebikes.com/wp-content/uploads/2015/03/IMG_7487-1024x768.jpg"
            ></img>
          </h3>
          <h3
            id="gears"
            style={{ marginTop: 30 + "px", marginBottom: 15 + "px" }}
          >
            <b>Front/Rear gears pictures</b>
          </h3>
          <h3 style={{ marginBottom: 15 + "px" }}>
            <img
              alt="Front Gears"
              src="https://cdn.mos.cms.futurecdn.net/dVhmwJUi8225qH75uZ6kUG.jpg"
            ></img>
          </h3>
          <h3 style={{ marginBottom: 15 + "px" }}>
            <img
              alt="Rear Gears"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/s-works-aethos-0054-preview-1606864271.jpg"
            ></img>
          </h3>
          <h3 id="frame" style={{ marginTop: 30 + "px" }}>
            <b>Frame pictures</b>
          </h3>
          <h3 style={{ marginBottom: 15 + "px" }}>
            <img
              alt="Frame 1"
              src="https://willem.com/blog/2018-06-09_removing-paint-from-a-bike-frame/images/Removing-paint-from-a-bike-frame-2x.jpg"
            ></img>
          </h3>
          <h3 style={{ marginBottom: 15 + "px" }}>
            <img
              alt="Frame 2"
              src="https://willem.com/blog/2018-06-09_removing-paint-from-a-bike-frame/images/i_11_Schindelhauer-steer-mounted-on-my-aluminium-bike_500px.jpg"
            ></img>
          </h3>
          <h3 style={{ marginBottom: 15 + "px" }}>
            <img
              alt="Frame 3"
              src="https://farm6.staticflickr.com/5066/5665608612_967fcafdd8_z.jpg"
            ></img>
          </h3>
          <h3 id="frame_number" style={{ marginTop: 30 + "px" }}>
            <b>Frame number</b>
          </h3>
          <h3 style={{ marginBottom: 15 + "px" }}>
            <img
              alt="Frame number"
              src="https://www.vanmoof.com/blog/assets/uploads/images/_1060xAUTO_fit_center-center_80_none/In-article.blog.1060x500-with-pointer.png"
            ></img>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default PhotoGuide;
