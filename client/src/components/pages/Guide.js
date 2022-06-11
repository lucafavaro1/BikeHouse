import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/Guide.css";

function Guide() {
  return (
    <div className="introduction">
      <h2>
        <b>The ABC’s: Air, Brakes, Chain</b>
      </h2>
      <p>
        Before every ride, be sure to check the “ABC’s” to make your ride safer
        and help your bike last longer.
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
          ensure your quick-release levers and thru axles (if you have them) are
          properly tightened as well. Then, before you ride, make sure you have
          your patch kit and pump with you.
        </li>
        <li>
          <b>B is for Brakes: </b>Squeeze your front and rear brake levers to
          make sure that the brakes engage properly and smoothly.
        </li>
        <li>
          <b>C is for Chain: </b>Look at your chain and all the gears. Keeping
          your chain lubricated and everything clean will ensure your bike
          shifts easier and the drivetrain (made up of the front chain rings,
          rear cassette, rear derailleur and chain) last longer.
        </li>
      </ul>

      <div className="contentGuide">
        {/* style={{ float: "left" }} */}
        <p>&nbsp;</p>
        <h2>
          <b>Cleaning and Lubricating Your Bike</b>
        </h2>
        <h2>
          <img
            alt="Cleaning a bike"
            src="https://www.rei.com/dam/keener_061815_bikeframe.jpg"
          ></img>
        </h2>
        <p>
          A regular schedule of maintenance (monthly, weekly or more often
          depending on your type of riding) is important. If you spend a lot of
          time riding in wet, muddy conditions, or if you ride hard, fast and
          often, plan to clean your bike more frequently.
        </p>
        <p>
          Keeping your bike parts properly cleaned and lubricated is crucial for
          good performance. Lubrication protects moving parts from excessive
          wear caused by friction, prevents them from "freezing up," and helps
          keep rust and corrosion at bay.
        </p>
        <p>
          <img
            alt="Lubricating a bike"
            src="https://www.rei.com/dam/keener_061815_0016_derailleurassembly.jpg"
          ></img>
          Be careful, though. Over-lubricating can lead to poor performance and
          component damage (excess lubricant will attract dirt and other
          abrasive particles). As a general rule, excess lube should always be
          carefully wiped away before the bicycle is ridden.
        </p>
        <p>
          Tip<b>: </b>When lubricating a number of parts at once, remember the
          order in which you apply the lubricants. Wiping off excess lube in the
          same order will give the lubricants time to soak in.
        </p>
      </div>
    </div>
  );
}

export default Guide;
