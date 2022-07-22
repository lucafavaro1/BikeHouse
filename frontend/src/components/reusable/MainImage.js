import React from "react";

function MainImage({ src }) {
  return (
    <>
      <div className="row no-gutters pl-2">
        <div className="col-12">
          <img class="img-fluid" style={{ height: 350 }} src={src} alt="" />
        </div>
      </div>
    </>
  );
}

export default MainImage;
