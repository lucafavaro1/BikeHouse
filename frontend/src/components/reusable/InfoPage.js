import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SellIcon from "@mui/icons-material/Sell";
import DoneIcon from "@mui/icons-material/Done";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import EuroIcon from "@mui/icons-material/Euro";
import ConditionIndicator from "../pages/ConditionIndicator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GppBadIcon from "@mui/icons-material/GppBad";
// Redux
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import {addToCart} from "../../features/cartSlice";

function InfoPage({
  id,
  images,
  location,
  sellerName,
  frameVerified,
  bikeCondition,
  price,
  description,
  brand,
  model,
  sellerVerified,
  // addToCart
}) {
  const dispatch = useDispatch();
  const handleCart = (e) => {
    e.preventDefault();
    // console.log(data)
    dispatch(addToCart(data))
  };
  const data = {
    id,
    images,
    location,
    sellerName,
    price,
    brand,
    model
  }
  return (
    <Grid
      container
      direction={"column"}
      style={{ height: "100%", marginLeft: 1 }}
    >
      <Typography variant="subtitle1">
        {" "}
        <LocationOnIcon></LocationOnIcon> {location}
      </Typography>

      <Box
        mt={"2"}
        display="table-column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="subtitle1">
          {sellerVerified ? (
            <CheckCircleIcon sx={{ display: "inline-block" }} />
          ) : (
            <GppBadIcon sx={{ display: "inline-block" }} />
          )}
          {sellerName}
        </Typography>
        <Typography variant="subtitle1">
          {frameVerified ? <DoneIcon /> : <DoNotDisturbAltIcon />} Frame
          Verified
        </Typography>
        <Box component="span" sx={{}}>
          {<ConditionIndicator numOfStars={bikeCondition} size={1} />}{" "}
          <span> Bike condition</span>
        </Box>

        <Typography variant="subtitle1">
          <EuroIcon /> {price}
        </Typography>
      </Box>
      <Button
        variant={"contained"}
        color={"primary"}
        style={{ marginTop: "auto" }}
        onClick={handleCart}
      >
        Add to Cart
      </Button>
    </Grid>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (data) => dispatch(addToCart(data)),
//   };
// };

export default InfoPage;
