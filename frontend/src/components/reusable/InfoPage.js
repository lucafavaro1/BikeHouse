import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SellIcon from "@mui/icons-material/Sell";
import DoneIcon from "@mui/icons-material/Done";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import EuroIcon from "@mui/icons-material/Euro";

function InfoPage({
  location,
  sellerName,
  frameVerified,
  bikeCondition,
  price,
}) {
  return (
    <Grid container direction={"column"} style={{ height: "100%" }}>
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
          <SellIcon></SellIcon>
          {sellerName}
        </Typography>
        <Typography variant="subtitle1">
          {frameVerified ? <DoneIcon /> : <DoNotDisturbAltIcon />} Frame
          Verified
        </Typography>

        <Typography variant="subtitle1">
          Bike condition : {bikeCondition}
        </Typography>
        <Typography variant="subtitle1">
          <EuroIcon /> {price}
        </Typography>
      </Box>
      <Button
        variant={"contained"}
        color={"primary"}
        style={{ marginTop: "auto" }}
      >
        Add to Cart
      </Button>
    </Grid>
  );
}

export default InfoPage;
