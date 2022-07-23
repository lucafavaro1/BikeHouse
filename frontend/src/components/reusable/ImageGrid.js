// resuable component function to define and style an image grid 

import { Grid } from "@mui/material";
import React from "react";

function ImageGrid({ images, onSelect, selectedImage }) {
  return (
    <Grid container direction="column">
      {images.map((image, index) => (
        <img
          src={image}
          height={"100%"}
          width={"100%"}
          onClick={() => onSelect(index)}
          style={{
            border:
              index === selectedImage ? "solid black 1px" : "solid #eee 1px",
            cursor: "pointer",
          }}
          alt=''
        />
      ))}
    </Grid>
  );
}

export default ImageGrid;
