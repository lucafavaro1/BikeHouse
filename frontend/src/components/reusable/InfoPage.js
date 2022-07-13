import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CircularProgress } from "@material-ui/core";
import SellIcon from "@mui/icons-material/Sell";
import DoneIcon from "@mui/icons-material/Done";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import EuroIcon from "@mui/icons-material/Euro";
import ConditionIndicator from "../pages/ConditionIndicator";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, AUTH_TOKENS } from "../../features/userSlice";

function InfoPage({
  sellerId,
  bikeId,
  isBoosted,
  listingId,
  location,
  sellerName,
  frameVerified,
  bikeCondition,
  price,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const payBoost = async (listingId) => {
    console.log(listingId);
    setIsLoading(true);
    await axios
      .post("http://localhost:3001/create-checkout-session/", {
        name: "Boosting for Ad 🚀",
        price: 5,
        successLink: "/checkout/?success=true&listingId=" + listingId,
        cancelLink: "/checkout/?canceled=true&listingId=" + listingId,
      })
      .then((response) => {
        setIsLoading(false);
        window.location = response.data.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteListing = async (listingId) => {
    setIsLoading(true);
    await axios
      .delete("http://localhost:3001/deleteListing/" + listingId)
      .then((response) => {
        setIsLoading(false);
        navigate("/dashboard/");
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  const deleteBike = async (bikeId) => {
    setIsLoading(true);
    await axios
      .delete("http://localhost:3001/deleteBike/" + bikeId)
      .then((response) => {
        setIsLoading(false);
        navigate("/dashboard/");
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 150 + "px",
            marginBottom: 150 + "px",
          }}
        >
          <CircularProgress size={100} style={{ color: "#2e6076" }} />
        </div>
      ) : (
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
              <SellIcon></SellIcon>
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

          {/* if user is logged and id owner corresponds to user than check if id is boosted, if not display the boost it now */}
          {sellerId == user.userId && !isBoosted ? (
            <Button
              variant={"contained"}
              color={"warning"}
              style={{ marginTop: "auto" }}
              onClick={() => payBoost(listingId)}
            >
              Boost it now
            </Button>
          ) : (
            <p></p>
          )}

          {sellerId == user.userId ? (
            <Button
              variant={"contained"}
              color={"error"}
              style={{ marginTop: "auto" }}
              onClick={() => {
                deleteListing(listingId);
                deleteBike(bikeId);
              }}
            >
              Delete listing
            </Button>
          ) : (
            <Button
              variant={"contained"}
              color={"primary"}
              style={{ marginTop: "auto" }}
            >
              Purchase
            </Button>
          )}
        </Grid>
      )}
    </>
  );
}

export default InfoPage;
