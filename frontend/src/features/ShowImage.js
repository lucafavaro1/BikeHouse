// function to display image containers

import Image from "./Image";

const ShowImage = ({ images }) => {
  const show = (image) => {
    return <Image image={image} />;
  };
  return <div className="row container">{images.map(show)}</div>;
};
export default ShowImage;
