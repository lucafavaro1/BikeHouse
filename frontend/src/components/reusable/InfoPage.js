import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SellIcon from "@mui/icons-material/Sell";
import DoneIcon from "@mui/icons-material/Done";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import EuroIcon from "@mui/icons-material/Euro";
import ConditionIndicator from "./ConditionIndicator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GppBadIcon from "@mui/icons-material/GppBad";

function InfoPage({
  location,
  sellerName,
  frameVerified,
  bikeCondition,
  price,
  sellerVerified,
}) {
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
      >
        Purchase
      </Button>
    </Grid>
  );
}

export default InfoPage;
