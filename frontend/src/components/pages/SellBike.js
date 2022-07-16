import { Button, Row, Nav, Card, Modal } from "react-bootstrap";
import axios from "axios";
import AxiosJWT from "../utils/AxiosJWT";
import React, { useState, useCallback, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../css/SellBike.css";
import DropBox from "../../features/Dropbox";
import ShowImage from "../../features/ShowImage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { selectUser, AUTH_TOKENS } from "../../features/userSlice";
import rocketImg from "../pictures/rocket.png";
import { Navigate } from "react-router-dom";
import { listCities } from "cclist";

function SellBike() {
  const user = useSelector(selectUser);
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [frameSize, setFrameSize] = useState("");
  const [frameMaterial, setFrameMaterial] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [frontGears, setFrontGears] = useState(0);
  const [rearGears, setRearGears] = useState(0);
  const [brakeType, setBrakeType] = useState("");
  const [description, setDescription] = useState("");
  const [conditionVerification, setConditionVerification] = useState(false);
  const [frameVerification, setFrameVerification] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [isBoosted, setIsBoosted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setStep(2);
    }
    setValidated(true);
  };

  const payBoost = async (listingId, bikeId) => {
    console.log(listingId);
    console.log(bikeId);
    setIsLoading(true);
    await axios
      .post("http://localhost:3001/checkout-boost-specialist/", {
        name: "Boosting for Ad 🚀",
        price: 5,
        successLink: "/listing/" + listingId,
        cancelLink:
          "/checkout/?canceled=true" +
          "&" +
          "bikeId=" +
          bikeId +
          "&" +
          "listingId=" +
          listingId,
      })
      .then((response) => {
        setIsLoading(false);
        window.location = response.data.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadImages = () => {
    axios
      .post(`http://localhost:3001/image-upload`, {
        photos,
      })
      .then((res) => {
        console.log(res);
        var copyPhoto = [...photos];
        for (let i = 0; i < copyPhoto.length; i++) {
          copyPhoto[i].url = res.data[i].url;
          copyPhoto[i].src = null;
        }
        setPhotos(copyPhoto);
        submitItem();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitItem = async () => {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    } else {
      console.log("Auth TOkens is null");
    }
    setIsLoading(true);

    await AxiosJWT.post("http://localhost:3001/createItem", {
      headers: {
        authorization: "Bearer " + authTokens.accessToken,
      },
      brand,
      model,
      type,
      location,
      price,
      frameSize,
      frameMaterial,
      color,
      gender,
      frontGears,
      rearGears,
      brakeType,
      description,
      conditionToBeVerified: conditionVerification,
      frameToBeVerified: frameVerification,
      photos,
      frameVerified: false,
      condition: 0,
      isBoosted,
    })
      .then((response) => {
        console.log(`Item successfully added`);
        createListing(response.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  const createListing = async (itemId) => {
    let authTokens = localStorage.getItem(AUTH_TOKENS);
    if (authTokens != null) {
      authTokens = JSON.parse(authTokens);
    }
    setIsLoading(true);

    AxiosJWT.post("http://localhost:3001/createListing", {
      headers: {
        authorization: "Bearer " + authTokens.accessToken,
      },
      isBoosted,
      isActive: true,
      bikeId: itemId,
      sellerId: user.userId,
      finalPrice: calculateFinalPrice(price),
      shouldBeVerified: conditionVerification && frameVerification,
    })
      .then((response) => {
        console.log(`Listing successfully added`);
        if (isBoosted) payBoost(response.data._id, itemId);
        else navigate("/listing/" + response.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  function calculateFinalPrice(price) {
    var finalPrice = +price;
    if (conditionVerification) finalPrice = finalPrice + 0.03 * price; // decide how much to get as fee
    if (frameVerification) finalPrice = finalPrice + 0.03 * price; // decide how much to get as fee
    return finalPrice;
  }

  function checkShown() {
    let check = false;
    photos.forEach((photo) => {
      check = photo.toShow || check;
    });
    return check;
  }

  function ErrorMessage({ message }) {
    return <div className="alert alert-danger">{message}</div>;
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setPhotos((prevState) => [
          ...prevState,
          {
            id: index,
            src: reader.result,
            name: file.name,
            size: file.size,
            toShow: false,
          },
        ]);
      };
      return file;
    });
  }, []);

  const removePhoto = (item) => {
    var newPhotos = [...photos];
    var index = newPhotos.indexOf(item);
    if (index !== -1) {
      newPhotos.splice(index, 1);
      setPhotos(newPhotos);
    }
  };

  const lists = photos.map((list) => (
    <div>
      <li key={list.id}>
        {list.name} - {list.size} bytes{" "}
        <Button
          className="close_button"
          variant="outline-danger"
          onClick={() => removePhoto(list)}
        >
          X
        </Button>{" "}
      </li>
    </div>
  ));

  let photoList = photos.map((item) => {
    return (
      <Form.Check>
        <Form.Check.Input
          type="checkbox"
          onClick={() => {
            var newPhotos = [...photos];
            newPhotos[newPhotos.indexOf(item)].toShow =
              !newPhotos[newPhotos.indexOf(item)].toShow;
            setPhotos(newPhotos);
          }}
        />
        <Form.Check.Label>{item.name}</Form.Check.Label>
      </Form.Check>
    );
  });

  function renderSwitch(param) {
    switch (param) {
      case 1:
        return (
          <div className="bike_details">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="initialText">
                <h2> Describe you bike in detail ... </h2>
                <p>
                  {" "}
                  All fields have to be completed to procede to the next step.
                </p>
              </div>
              <Row>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Brand"
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Model"
                    onChange={(e) => {
                      setModel(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    className="col"
                    style={{ height: 38 + "px" }}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  >
                    <option value="">Select City</option>
                    {/* since they are 780 cities and are ordered by population, I keep the first 200 that have > 50k inhabitants */}
                    {listCities("DE", { limit: 200 })
                      .sort()
                      .map((city) => {
                        return <option value={city}>{city}</option>;
                      })}
                  </Form.Control>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    className="col"
                    style={{ height: 38 + "px" }}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    <option value="">Select Type</option>
                    <option value="City">City Bike</option>
                    <option value="Road">Road Bike</option>
                    <option value="MTB">Mountain Bike</option>
                    <option value="Downhill">Downhill</option>
                    <option value="Gravel">Gravel</option>
                    <option value="Folding">Folding</option>
                    <option value="E-Bike">E-Bike</option>
                    <option value="Classic">Classic</option>
                    <option value="Others">Others</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    className="col"
                    style={{ height: 38 + "px" }}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Child">Child</option>
                    <option value="Man">Man</option>
                    <option value="Woman">Woman</option>
                    <option value="Unisex">Unisex</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    className="col"
                    style={{ height: 38 + "px" }}
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                  >
                    <option value="">Select the main bike's color</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Gray">Gray</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Purple">Purple</option>
                    <option value="Brown">Brown</option>
                    <option value="Red">Red</option>
                    <option value="Orange">Orange</option>
                  </Form.Control>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Frame Size</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter Frame Size"
                    onChange={(e) => {
                      setFrameSize(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Frame Material</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    className="col"
                    style={{ height: 38 + "px" }}
                    onChange={(e) => {
                      setFrameMaterial(e.target.value);
                    }}
                  >
                    <option value="">Select Frame Material</option>
                    <option value="Aluminium">Aluminium</option>
                    <option value="Carbon">Carbon</option>
                    <option value="Steel">Steel</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="col mt-3 mb-3"></Form.Group>
              </Row>

              <Row>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Front Gears</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="1"
                    max="3"
                    placeholder="Enter number of front gears"
                    onChange={(e) => {
                      setFrontGears(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Rear Gears</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="1"
                    max="12"
                    placeholder="Enter number or rear gears"
                    onChange={(e) => {
                      setRearGears(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="col mt-3 mb-3"></Form.Group>
              </Row>
              <Row>
                <Form.Group className="col mt-3 mb-3">
                  <Form.Label>Brake Type</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    className="col"
                    style={{ height: 38 + "px" }}
                    onChange={(e) => {
                      setBrakeType(e.target.value);
                    }}
                  >
                    <option value="">Select Brake Type</option>
                    <option value="Disk">Disk Brake</option>
                    <option value="Rim">Rim Brake</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="col mt-3 mb-3"></Form.Group>
                <Form.Group className="col mt-3 mb-3"></Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={4}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Form.Group>
              <Row>
                <Form.Group className="col mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="0"
                    placeholder="Enter the amount"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="col mt-3 mb-3"></Form.Group>
                <Form.Group className="col mt-3 mb-3"></Form.Group>
              </Row>
              <hr></hr>
              <Row>
                <Button
                  href="/"
                  className="col mt-3 mb-3 custom"
                  variant="secondary"
                >
                  {" "}
                  Cancel{" "}
                </Button>
                <p className="col mt-3 mb-3"></p>
                <p className="col mt-3 mb-3"></p>
                <p className="col mt-3 mb-3"></p>

                <Button type="submit" className="col mt-3 mb-3 next">
                  Next
                </Button>
              </Row>
            </Form>
          </div>
        );
      case 2:
        return (
          <div className="upload_pictures">
            <Modal.Dialog className="photo_guide">
              <Modal.Title>&#9733;</Modal.Title>
              <Modal.Body>
                <p>
                  <a href="/photo_guide" target="_blank">
                    Click here
                  </a>{" "}
                  to see our photo guide
                </p>
              </Modal.Body>
            </Modal.Dialog>

            <div className="initialText">
              <h2>How does it look? </h2>
              <hr></hr>
              <p>
                {" "}
                Upload pictures of your bike. Ads with more pictures are usually
                the most viewed ones!
              </p>{" "}
              <p>
                {" "}
                If you wish your bike condition to be verified by us, make sure
                the following parts of the bike are visible on the images:
                <ul>
                  <li>Front and back wheel (separately)</li>
                  <li>Brake pads/disks (front and rear) </li>
                  <li>Front and rear gears (separately) </li>
                  <li>Frame (at least one picture per bike side) </li>
                </ul>
                &#9888; The only accepted formats for images are .png and .jpeg
                &#9888;
              </p>
            </div>
            <div className="dragndrop">
              <DropBox onDrop={onDrop} />
              <aside>
                <h5>Uploaded pictures:</h5>
                <p>{lists}</p>
              </aside>
              <ShowImage images={photos} />
              {errorMessage.length > 0 ? (
                <ErrorMessage message={errorMessage} />
              ) : (
                <p></p>
              )}
            </div>
            <div className="initialText">
              <h4>Which images do you wanna show on your listing?</h4>
              <hr></hr>
              <p>Please select from the following list</p>
              {photoList}
              <p></p>
              <h3>Verification</h3>
              <hr></hr>
              <Row>
                <div className="col-9">
                  <Form.Check>
                    <p></p>
                    <Form.Check.Input
                      type="checkbox"
                      id="condition_verification"
                      onClick={() =>
                        setConditionVerification(!conditionVerification)
                      }
                    />
                    <Form.Check.Label>
                      {" "}
                      I want an expert to verify the <b>condition</b> of my bike
                    </Form.Check.Label>
                  </Form.Check>
                  <Form.Check>
                    <Form.Check.Input
                      type="checkbox"
                      id="frame_verification"
                      onClick={() => setFrameVerification(!frameVerification)}
                    />
                    <Form.Check.Label>
                      {" "}
                      I want an expert to verify the <b>frame number</b> of my
                      bike
                    </Form.Check.Label>
                  </Form.Check>
                </div>
                <div className="col-3">
                  <Modal.Dialog className="modal_verification">
                    <Modal.Title>&#9888;</Modal.Title>
                    <Modal.Body>
                      <p>Verification affects the listing order.</p>
                    </Modal.Body>
                  </Modal.Dialog>
                </div>
              </Row>
              <p></p>
            </div>
            <hr></hr>
            <Row>
              <Button
                href="/"
                className="col mt-3 mb-3 custom"
                variant="secondary"
              >
                {" "}
                Cancel{" "}
              </Button>
              <p className="col mt-3 mb-3"></p>
              <p className="col mt-3 mb-3"></p>
              <Button
                className="col mt-3 mb-3 next"
                onClick={() => {
                  if (photos.length == 0)
                    setErrorMessage(
                      "Please upload pictures of your bike before moving to the next step"
                    );
                  else if (!checkShown())
                    setErrorMessage(
                      "Please select at least one picture to be shown before moving to the next step"
                    );
                  else setStep(3);
                }}
              >
                Next
              </Button>
            </Row>
          </div>
        );
      case 3:
        return (
          <div className="almost_done">
            <div className="initialText">
              <h2>Almost done... </h2>
              <hr></hr>
              <p>Your listing is ready to be published.</p>
              <p>
                Note that, in case you selected any verification, the listing
                will be published as soon as the verification team has processed
                this request.
              </p>
            </div>
            <Card className="text-left mt-5 mb-5 card">
              <Card.Body>
                <Card.Img className="rocket" src={rocketImg} />
                <Card.Title>Special Boosting</Card.Title>
                <Card.Text>
                  Would you like to sell your bike faster? Boost your listing
                  for only €5!
                </Card.Text>
                <Button
                  variant="primary"
                  className="boost_now"
                  onClick={() => {
                    setIsBoosted(true);
                  }}
                >
                  Boost Now
                </Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                If you change your mind, you can also boost it later from your
                listing page{" "}
              </Card.Footer>
            </Card>
            <Row>
              <Button
                href="/"
                className="col mt-3 mb-3 custom"
                variant="secondary"
              >
                {" "}
                Cancel{" "}
              </Button>
              <p className="col mt-3 mb-3"></p>
              <p className="col mt-3 mb-3"></p>

              <Button
                className="col mt-3 mb-3 next"
                // Warning! If you redirect it will fail for some stupid reasons
                onClick={() => {
                  uploadImages();
                }}
              >
                Submit
              </Button>
            </Row>
          </div>
        );
      default:
        return <p> Something went wrong, please refresh the page</p>;
    }
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

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
        <div className="sellBike">
          <Nav justify variant="tabs" activeKey={step} className="navbar_state">
            <Nav.Item>
              <Nav.Link eventKey="1">1. Bike Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2">2. Upload Pictures</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3">3. Done!</Nav.Link>
            </Nav.Item>
          </Nav>

          {renderSwitch(step)}
        </div>
      )}
    </>
  );
}

export default SellBike;
