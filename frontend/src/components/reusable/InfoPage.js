import { CircularProgress } from "@material-ui/core";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneIcon from "@mui/icons-material/Done";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import EuroIcon from "@mui/icons-material/Euro";
import AxiosJWT from "../utils/AxiosJWT";
import GppBadIcon from "@mui/icons-material/GppBad";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import { selectUser, AUTH_TOKENS } from "../../features/userSlice";
import "../css/InfoPage.css";
import ConditionIndicator from "./ConditionIndicator";

function InfoPage({
  bikeId,
  isBoosted,
  sellerId,
  listingId,
  location,
  sellerName,
  frameVerified,
  bikeCondition,
  price,
  description,
  brand,
  model,
  sellerVerified,
  images,
  category,
  frontGears,
  rearGears,
  brakeType,
  frameMaterial,
  frameSize,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBasket = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to add to cart");
      navigate("/login");
      return;
    }
    const data = {
      bikeId,
      isBoosted,
      sellerId,
      listingId,
      location,
      sellerName,
      frameVerified,
      bikeCondition,
      price,
      description,
      brand,
      model,
      sellerVerified,
      images,
      category,
      frontGears,
      rearGears,
      brakeType,
      frameMaterial,
      frameSize,
    };
    dispatch(addToCart(data));
    toast.success("Item added to cart!");
  };
  const payBoost = async (listingId) => {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    console.log(listingId);
    setIsLoading(true);
    await AxiosJWT.post("http://localhost:3001/checkout-boost-specialist/", {
      headers: {
        authorization: "Bearer " + authTokens.accessToken,
      },
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
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    setIsLoading(true);
    await AxiosJWT.delete("http://localhost:3001/deleteListing/" + listingId, {
      headers: {
        authorization: "Bearer " + authTokens.accessToken,
      },
    })
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
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth Tokens is null");
    }
    setIsLoading(true);
    await AxiosJWT.delete("http://localhost:3001/deleteBike/" + bikeId, {
      headers: {
        authorization: "Bearer " + authTokens.accessToken,
      },
    })
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
    <div className="infoPage">
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
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                color: "#2e6076",
                border: "2px solid",
                borderColor: "#2e6076",
              },
            }}
            reverseOrder={false}
          />

          <div className="mb-2">
            <Typography variant="subtitle1">
              {" "}
              <LocationOnIcon></LocationOnIcon> {"   " + location}
            </Typography>
          </div>

          <Box
            mt={"2"}
            display="table-column"
            alignItems="center"
            justifyContent="center"
          >
            <div className="mb-2">
              <Typography variant="subtitle1">
                {sellerVerified ? (
                  <CheckCircleIcon sx={{ display: "inline-block" }} />
                ) : (
                  <GppBadIcon sx={{ display: "inline-block" }} />
                )}
                {"   " + sellerName}
              </Typography>
            </div>
            <div className="mb-2">
              <Typography variant="subtitle1">
                {frameVerified ? <DoneIcon /> : <DoNotDisturbAltIcon />} Frame
                Verified
              </Typography>
            </div>
            <div className="mb-2">
              <Box component="span" sx={{}}>
                {<ConditionIndicator numOfStars={bikeCondition} size={1} />}{" "}
                <span> Bike condition</span>
              </Box>
            </div>
            <Typography variant="h6">
              <EuroIcon /> {price}
            </Typography>
          </Box>

          {/* if user is logged and id owner corresponds to user than check if id is boosted, if not display the boost it now */}
          {user != undefined && sellerId == user.userId && !isBoosted ? (
            <Button
              variant={"contained"}
              color={"warning"}
              style={{ maxWidth: "200px", marginTop: "50px" }}
              onClick={() => payBoost(listingId)}
            >
              Boost it now
            </Button>
          ) : (
            <p></p>
          )}

          {user != undefined && sellerId == user.userId ? (
            <>
              <Button
                variant={"contained"}
                color={"error"}
                style={{ maxWidth: "200px", marginTop: "50px" }}
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Delete listing
              </Button>

              <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
                style={{ marginTop: 200 + "px" }}
              >
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure you want to delete this listing?
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    The listing will be deleted immediately. You can't undo this
                    action.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant={"outlined"}
                    color={"primary"}
                    style={{ maxWidth: "200px", marginRight: "auto" }}
                    onClick={() => setModalShow(false)}
                  >
                    Back
                  </Button>
                  <Button
                    variant={"contained"}
                    color={"error"}
                    onClick={() => {
                      deleteListing(listingId);
                      deleteBike(bikeId);
                    }}
                  >
                    Yes, delete it
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <Button
              className="addBasket"
              variant={"contained"}
              color={"primary"}
              onClick={handleBasket}
            >
              Add to basket
            </Button>
          )}
        </Grid>
      )}
    </div>
  );
}

export default InfoPage;
