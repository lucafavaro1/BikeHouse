import Image from "./Image";
import "../features/ShowImage.css";

const ShowImage = ({ images }) => {
  const show = (image) => {
    return <Image image={image} />;
  };
  return <div className="container">{images.map(show)}</div>;
};
export default ShowImage;