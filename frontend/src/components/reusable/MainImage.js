import React from "react";

function MainImage({ src }) {
  return (
    <div style={{ padding: 2 }}>
      <img src={src} width="100%" />
    </div>
  );
}

export default MainImage;