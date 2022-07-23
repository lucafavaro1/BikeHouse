// function to load the guide page

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "../css/Guide.css";

function Guide() {
  return (
    <div className="guide content">
      <div className="guideNavbar">
        <a className="list-group-item list-group-item-action" href="#ABC">
          <b>The ABC’s</b>
        </a>
        <a className="list-group-item list-group-item-action" href="#cleaning">
          <b>Cleaning and lubricating your bike</b>
        </a>
        <a className="list-group-item list-group-item-action" href="#flat_tire">
          <b>Fix a flat tire</b>
        </a>
        <a className="list-group-item list-group-item-action" href="#seat_position">
          <b>Adjust the seat height and angle</b>
        </a>
      </div>
      <div className="page">
        <div
          data-bs-spy="scroll"
          data-bs-bs-target=".guideNavbar"
          data-offset="0"
          tabIndex="0"
        >
          <h2 id="ABC" style={{ marginTop: 10 + "px" }}>
            <b>The ABC’s</b>
          </h2>
          <p>
            Before every ride, be sure to check the “ABC’s” to make your ride
            safer and help your bike last longer.
          </p>
          <p>
            <img
              alt="Bike tire, brake lever, and chain"
              src="https://www.rei.com/dam/keener_062415_0044_abc.jpg"
            ></img>
          </p>

          <ul>
            <li>
              <b>A is for Air:</b> Having properly inflated tires helps prevent
              flats. Check the sidewall of your tire for the recommended tire
              pressure. While you’re checking the air, take the opportunity to
              ensure your quick-release levers and thru axles (if you have them)
              are properly tightened as well. Then, before you ride, make sure
              you have your patch kit and pump with you.
            </li>
            <li>
              <b>B is for Brakes: </b>Squeeze your front and rear brake levers
              to make sure that the brakes engage properly and smoothly.
            </li>
            <li>
              <b>C is for Chain: </b>Look at your chain and all the gears.
              Keeping your chain lubricated and everything clean will ensure
              your bike shifts easier and the drivetrain (made up of the front
              chain rings, rear cassette, rear derailleur and chain) last
              longer.
            </li>
          </ul>
          <h2
            id="cleaning"
            style={{ marginTop: 30 + "px", marginBottom: 15 + "px" }}
          >
            <b>Cleaning and lubricating your bike</b>
          </h2>
          <h2 style={{ marginBottom: 15 + "px" }}>
            <img
              alt="Cleaning a bike"
              src="https://www.rei.com/dam/keener_061815_bikeframe.jpg"
            ></img>
          </h2>
          <p>
            A regular schedule of maintenance (monthly, weekly or more often
            depending on your type of riding) is important. If you spend a lot
            of time riding in wet, muddy conditions, or if you ride hard, fast
            and often, plan to clean your bike more frequently.
          </p>
          <p>
            Keeping your bike parts properly cleaned and lubricated is crucial
            for good performance. Lubrication protects moving parts from
            excessive wear caused by friction, prevents them from "freezing up,"
            and helps keep rust and corrosion at bay.
          </p>
          <p>
            Be careful, though. Over-lubricating can lead to poor performance
            and component damage (excess lubricant will attract dirt and other
            abrasive particles). As a general rule, excess lube should always be
            carefully wiped away before the bicycle is ridden.
          </p>
          <p>
            Tip<b>: </b>When lubricating a number of parts at once, remember the
            order in which you apply the lubricants. Wiping off excess lube in
            the same order will give the lubricants time to soak in.
          </p>
          <h2
            id="flat_tire"
            style={{ marginTop: 30 + "px", marginBottom: 15 + "px" }}
          >
            <b>Fix a flat tire</b>
          </h2>

          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/qLO_HO0kEjs"
            title="How to Fix a Flat Tyre "
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p style={{ marginTop: 20 + "px" }}>
            1) Take off the wheel Open and remove the quick release level or use
            a wrench to loosen the nuts if you don’t have a quick release lever.
            Finally lift the wheel off the frame.
          </p>
          <p>2) Deflate the tire completely. </p>
          <p>
            3) Hook the rounded edge of a tire lever under the outer edge of
            your tire.
          </p>
          <p>
            4) Work a second tire lever clockwise around the circumference of
            the tire.
          </p>
          <p>5) Pull the tube out from inside the tire.</p>
          <p>
            6) Unwrap the new tube and remove the dust cap, lock ring, and valve
            cover.
          </p>
          <p>
            7) Inspect the inside wall of the tire for a punctur, if there's
            something stuck than remove it, otherwise procede to the next step.
          </p>
          <p>8) Place the tube inside the tire.</p>
          <p>
            9) Work the tire back onto the wheel on one side, then on the other.
          </p>
          <p>
            10) Screw the lock ring down over your air valve if there is one.
          </p>
          <p> 11) Inflate your tire at the correct pressure level.</p>
          <p>
            12)Slide the wheel back onto the bike and replace the lever or nuts.
          </p>
          <h2 id="seat_position" style={{ marginTop: 30 + "px" }}>
            <b>Ajdust the seat height and angle</b>
          </h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/5-vhIvcrVzU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p style={{ marginTop: 20 + "px" }}>
            <b>1) Seat Height</b>
          </p>
          <p>
            Adjust your seat height by loosening the pinch bolt where the
            seatpost slides into the frame. Twist the seat to raise or lower the
            post as needed and then tighten the bolt. Now get on your bike and
            place the ball of your foot directly on top of the pedal spindle,
            when the crank is at the bottom of the rotation. Your leg should be
            just slightly bent. If your leg is too bent you will need to raise
            the seatpost, and if your leg is too straight you should lower the
            post. Another way to check this is place the heel of your foot over
            the pedal spindle. Your leg should be exactly straight in this
            position.
          </p>
          <p>
            {" "}
            <b> 2) Seat Angle</b>
          </p>
          <p>
            Seat angle and position are adjusted by loosening the seat clamp
            under the seat. These often have a lot of parts so be sure to only
            loosen the clamp enough to move the seat around. Your seat angle
            should be horizontal, but you may want to play with the adjustment.
            Women often like to have the nose pointing just slightly downward,
            while men often feel more comfortable with the nose pointing
            slightly up.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Guide;
