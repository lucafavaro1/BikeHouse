// resuable component function to add descriptions to accessories 

import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import "../css/AccessoryDescription.css";

import toast, { Toaster } from "react-hot-toast";

function AccessoryDescription(props) {
  const dispatch = useDispatch();

  //function to add to cart and display toast
  const handleAccessory = (e) => {
    e.preventDefault();

    const data = {
      category: props.accessory.kind,
      listingId: props.accessory._id.valueOf(),
      images: props.accessory.photos,
      brand: props.accessory.brand,
      model: props.accessory.name,
      price: props.accessory.price,
      quantity: 1,
    };
    dispatch(addToCart(data));
    toast.success("Accessory added to cart!");
  };

  return (
    <>
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

      <div className="accessoryDesc">
        <Row>
          <span className="accName">{props.accessory.brand}</span>
        </Row>
        <Row>
          <span className="accName">{props.accessory.name}</span>
        </Row>
        <Row className="mt-2">
          <Col className="p-0">
            <span className="accPrice">&euro; {props.accessory.price}</span>
          </Col>

          <Col className="p-0">
            <button
              onClick={handleAccessory}
              className="btn float-right addToCartBtn"
            >
              <FontAwesomeIcon icon={faCartPlus} size="xl" />
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AccessoryDescription;
