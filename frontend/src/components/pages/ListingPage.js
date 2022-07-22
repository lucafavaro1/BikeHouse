import { CircularProgress } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGrid from "../reusable/ImageGrid";
import InfoPage from "../reusable/InfoPage";
import MainImage from "../reusable/MainImage";

function ListingPage(props) {
  const { id } = useParams();

  useEffect(() => {
    async function getListing(listingId) {
      try {
        const listing = await axios.get(
          "http://localhost:3001/listing/" + listingId
        );
        setListing(listing.data);
        console.log(listing.data);
        setProduct({
          bikeId: listing.data.bikeId,
          isBoosted: listing.data.isBoosted,
          sellerId: listing.data.sellerId,
          listingId: listing.data.listingId,
          location: listing.data.location,
          sellerName: listing.data.sellerName,
          frameVerified: listing.data.frameVerified,
          bikeCondition: listing.data.bikeCondition,
          price: listing.data.price,
          description: listing.data.description,
          brand: listing.data.brand,
          model: listing.data.model,
          sellerVerified: listing.data.sellerVerified,
          images: listing.data.images,
          category: listing.data.category,
        });
        const photosFromResponse = listing.data.images;
        console.log(photosFromResponse.length);
        if (listing && photosFromResponse) {
          let photos = [];
          console.log(typeof listing.data.images);
          for (let i = 0; i < photosFromResponse.length; i++) {
            photos.push(photosFromResponse[i].url);
          }
          console.log("photos are" + photos);
          setImages(photos);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    console.log(props);
    console.log("LISTING ID:" + id);
    getListing(id);
    // console.log(listing);
  }, []);

  const imagesTemp = [
    "https://www.galeria-frankkrueger.com/uzwheuzw/uploads/2018/08/the-rolling-stones-frank-krueger-2018-2.jpg",
    "https://www.groningermuseum.nl/de/media/2/Tentoonstellingen/2020/RS/_1200x630_crop_center-center_82_none/TheRollingStones.jpg?mtime=1594374283",
    "https://www1.wdr.de/radio/wdr4/veranstaltungen/vorschau/rolling-stones-gelsenkirchen-104~_v-HintergrundL.jpg",
  ];
  const productTemp = {
    location: "Liverpool",
    sellerName: "Rolling stones",
    frameVerified: true,
    bikeCondition: 2,
    price: 33,
    description: "Lorem ipsum",
    brand: "brand of the bike",
    model: "model of the bike",
    sellerVerified: true,
    category: "bike",
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState();
  const [images, setImages] = useState(imagesTemp);
  const [product, setProduct] = useState(productTemp);

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
        <>
          {listing ? (
            <>
              <div
                id="ListingPage"
                className="d-flex  justify-content-left m-5"
              >
                <div className="d-none d-md-block col-md-1"></div>
                <div className="d-none d-md-block col-md-3">
                  <Typography variant="h6">
                    {product.brand + " " + product.model}
                  </Typography>
                </div>
              </div>
              <div
                id="ListingPage"
                className="row justify-content-center mt-5 mb-5 ml-0 mr-0"
              >
                <div className="d-none d-md-block col-md-1 p-0" style={{
                  overflowY:'scroll',
                  maxHeight:'20rem'
                }}>
                  <ImageGrid
                    images={images}
                    onSelect={(index) => setSelectedImage(index)}
                    selectedImage={selectedImage}
                  ></ImageGrid>
                </div>
                <div className="d-none d-md-block col-md-5 p-0">
                  <MainImage src={images[selectedImage]}></MainImage>
                </div>

                <div className="col-md-3 ">
                  <InfoPage {...product}></InfoPage>
                </div>
              </div>
              <div
                id="detailedDesc"
                className="d-flex m-5 d-flex justify-content-center"
              >
                <Box component="span" sx={{ p: 2, border: 1, width: "60%" }}>
                  <Typography variant="h6" sx={{ mb: 10 + "px" }}>
                    Product Description
                  </Typography>
                  <hr></hr>
                  <Typography variant="headline1">
                    {product.description}
                  </Typography>
                </Box>
              </div>
            </>
          ) : (
            <>
              <Typography
                variant="subtitle1"
                className="row justify-content-left ml-5"
              >
                Listing Not available
              </Typography>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ListingPage;
