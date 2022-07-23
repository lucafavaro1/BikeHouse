// resuable component function to define and style Image 

import React from "react";

function MainImage({ src }) {
  return (
    <div style={{ padding: 2 }}>
      <img src={src} width="100%" alt=''/>
    </div>
  );
}

export default MainImage;
