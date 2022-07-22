import { CircularProgress } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Accordion, Button, Card, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Listings.css";
import questionMarkIcon from "../pictures/questionMarkIcon.png";
import rocketIcon from "../pictures/rocket.png";
import ListingDescription from "./ListingDescription";
import VerificationLegend from "./VerificationLegend";

function Listings() {
  const [listings, setListings] = useState([]);
  const [nextListings, setNextListings] = useState([]);
  const parameters = useRef({});
  const lastPageNum = useRef(Infinity);
  const activeSortingCriterion = useRef("default");
  const [activeCategoryBtn, setActiveCategoryBtn] = useState("");
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategoryColor = "gainsboro";
  const navigate = useNavigate();
  const { state } = useLocation();

  /** Possible bike colors */
  const colors = [
    "White",
    "Black",
    "Gray",
    "Yellow",
    "Blue",
    "Green",
    "Purple",
    "Brown",
    "Red",
    "Orange",
  ];

  /** Possible bike conditions */
  const conditions = ["Brand New", "Good", "Decent", "Bad", "Spare Parts"];

  /** Bike categories */
  const categories = [
    "City",
    "Road",
    "Mountain",
    "Downhill",
    "Gravel",
    "Folding",
    "E-bike",
    "Classic",
    "Others",
  ];

  useEffect(() => {
    getListings();
  }, []);

  /** Fetches listings from the backend */
  async function getListings(
    page = 0,
    shouldPreFetchNextPage = true,
    shouldUsePreFetchedNextPage = true,
    loadingAnimation = true
  ) {
    parameters.current.verifiedOnly = true;
    parameters.current.page = page;
    parameters.current.sortingCriterion = activeSortingCriterion.current;

    if (state && state.searchString) {
      // if there's a navigation state passed form another page
      parameters.current.searchKeyword = state.searchString;
    }

    if (nextListings.length != 0 && shouldUsePreFetchedNextPage) {
      // if there are already pre-fetched listings
      setListings(nextListings);
    } else {
      try {
        const response = await Axios.get("http://localhost:3001/listing", {
          params: parameters.current,
        });
        setListings(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    if (shouldPreFetchNextPage) {
      parameters.current.page = page + 1; // increment page number to pre-fetch the next page

      try {
        setIsLoading(loadingAnimation);
        const response = await Axios.get("http://localhost:3001/listing", {
          params: parameters.current,
        });
        setNextListings(response.data);

        if (response.data.length == 0) {
          // check if last page is reached
          lastPageNum.current = page;
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);

      parameters.current.page = page;
    }
  }

  /** Called when a listing is clicked */
  const listingClicked = async (listing) => {
    navigate("/listing/" + listing._id);
  };

  /** Called when the apply button is clicked */
  const applyFilterClicked = async (event) => {
    setIsFiltered(true);
    setCurrentPageNum(0);
    lastPageNum.current = Infinity;
    getListings(0, true, false, false);
  };

  /** Called when the next page button is clicked */
  const nextPageClicked = async (event) => {
    if (currentPageNum == lastPageNum.current) {
      return;
    }

    getListings(currentPageNum + 1, true, true, false);
    setCurrentPageNum(currentPageNum + 1);
  };

  /** Called when the previous page button is clicked */
  const prevPageClicked = async (event) => {
    if (currentPageNum == 0) {
      return;
    }

    getListings(currentPageNum - 1, false, true, false);
    setCurrentPageNum(currentPageNum - 1);
  };

  /** Called when the 'Need Help?' button is clicked */
  const needHelpClicked = async (event) => {
    navigate("/specialist");
  };

  /** Clears the current search string and fetches the listings again */
  const clearSearch = (event) => {
    state.searchString = "";
    parameters.current.searchKeyword = "";
    setCurrentPageNum(0);
    lastPageNum.current = Infinity;
    navigate(".", { replace: true });
    getListings();
  };

  const resetFiltersAndSorting = (event) => {
    parameters.current = {};
    activeSortingCriterion.current = "default";
    setCurrentPageNum(0);
    lastPageNum.current = Infinity;
    getListings(0, true, false, true);
    setIsFiltered(false);
  };

  /** Called when any of the accordion items is changed*/
  function handleFilterChange(eventObject) {
    let newValue = eventObject.target.value;
    let targetId = eventObject.target.id;
    let targetName = eventObject.target.name;

    if (targetId == "minPrice") {
      parameters.current.minPrice = parameters.current.minPrice || {};
      parameters.current.minPrice = newValue;
    } else if (targetId == "maxPrice") {
      parameters.current.maxPrice = parameters.current.maxPrice || {};
      parameters.current.maxPrice = newValue;
    } else if (targetId == "minFrameSize") {
      parameters.current.minFrameSize = parameters.current.minFrameSize || {};
      parameters.current.minFrameSize = newValue;
    } else if (targetId == "maxFrameSize") {
      parameters.current.maxFrameSize = parameters.current.maxFrameSize || {};
      parameters.current.maxFrameSize = newValue;
    } else if (targetId.includes("color")) {
      parameters.current.colors = parameters.current.colors || [];

      if (parameters.current.colors.includes(targetName)) {
        // remove if exists
        parameters.current.colors = parameters.current.colors.filter(
          (item) => item !== targetName
        );
      } else {
        // add if doesn't exist
        parameters.current.colors = [...parameters.current.colors, targetName];
      }
    } else if (targetId == "gender") {
      parameters.current.gender = parameters.current.gender || {};

      if (newValue !== "") {
        parameters.current.gender = newValue;
      } else {
        delete parameters.current.gender;
      }
    } else if (targetId.includes("condition")) {
      parameters.current.conditions = parameters.current.conditions || [];

      let conditionIndex = 5 - +targetName;

      if (parameters.current.conditions.includes(conditionIndex)) {
        // remove if exists
        parameters.current.conditions = parameters.current.conditions.filter(
          (item) => item !== conditionIndex
        );
      } else {
        // add if doesn't exist
        parameters.current.conditions = [
          ...parameters.current.conditions,
          conditionIndex,
        ];
      }
    } else if (targetId == "location") {
      parameters.current.location = parameters.current.location || {};
      parameters.current.location = newValue;
    } else if (targetId == "rearGears") {
      parameters.current.rearGears = parameters.current.rearGears || {};
      parameters.current.rearGears = newValue;
    } else if (targetId == "frontGears") {
      parameters.current.frontGears = parameters.current.frontGears || {};
      parameters.current.frontGears = newValue;
    } else if (targetId == "brakeType") {
      parameters.current.brakeType = parameters.current.brakeType || {};

      if (newValue !== "") {
        parameters.current.brakeType = newValue;
      } else {
        delete parameters.current.brakeType;
      }
    } else if (targetId == "frameMaterial") {
      parameters.current.frameMaterial = parameters.current.frameMaterial || {};

      if (newValue !== "") {
        parameters.current.frameMaterial = newValue;
      } else {
        delete parameters.current.frameMaterial;
      }
    } else if (targetId == "verification") {
      parameters.current.verification = parameters.current.verification || {};

      if (newValue !== "") {
        parameters.current.verification = newValue;
      } else {
        delete parameters.current.verification;
      }
    } else if (targetName == "categoryBtn") {
      parameters.current.type = parameters.current.type || {};

      if (activeCategoryBtn != targetId) {
        parameters.current.type = targetId;
      } else {
        delete parameters.current.type;
      }
    }
  }

  /** Called when a category button is clicked. Highlights the button, updates & applies the filter*/
  function handleCategoryChange(eventObject) {
    if (activeCategoryBtn != eventObject.target.id) {
      setActiveCategoryBtn(eventObject.target.id);
    } else {
      setActiveCategoryBtn("");
    }

    handleFilterChange(eventObject);
    applyFilterClicked();
  }

  /** Called when a sorting button is clicked*/
  function handleSortingCriterionChange(eventObject) {
    activeSortingCriterion.current = eventObject.target.id;
    handleFilterChange(eventObject);
    applyFilterClicked();
  }

  /** Renders a new Card component for each listing */
  const renderCard = (listing, index) => {
    return (
      <Card key={index} onClick={() => listingClicked(listing)}>
        <Card.Img variant="top" src={listing.bike.photos[0].url} />

        {listing.isBoosted ? (
          <div>
            <img src={rocketIcon} className="boostIcon" />
          </div>
        ) : (
          <span></span>
        )}

        <Card.Body>
          <Card.Text>
            <ListingDescription listing={listing}></ListingDescription>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  /** Renders a new Form.Check component for each bike color */
  const renderColorCheckbox = (color, index) => {
    return (
      <Form.Check
        label={color}
        name={color}
        type="checkbox"
        id={"color-" + color}
        onChange={handleFilterChange}
      />
    );
  };

  /** Renders a new Form.Check component for each bike condition */
  const renderConditionCheckbox = (condition, index) => {
    return (
      <Form.Check
        label={condition}
        name={index}
        type="checkbox"
        id={"condition-" + index}
        onChange={handleFilterChange}
      />
    );
  };

  /** Renders a new button for each bike category */
  const renderCategoryButton = (category, index) => {
    return (
      <button
        type="button"
        className="btn btn-block btn-light border"
        id={category}
        name="categoryBtn"
        style={
          activeCategoryBtn == category
            ? { backgroundColor: `${selectedCategoryColor}` }
            : {}
        }
        onClick={handleCategoryChange}
      >
        {category}
      </button>
    );
  };

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
          <div className="listings content">
            <div className="row">
              <div className="col-sm-2 categoriesTitleCol">
                <p>Categories:</p>
              </div>

              <div className="col-2 categoriesCol categoriesFirstCol">
                {categories.slice(0, 3).map(renderCategoryButton)}
              </div>

              <div className="col-2 categoriesCol">
                {categories.slice(3, 6).map(renderCategoryButton)}
              </div>

              <div className="col-2 categoriesCol border-right">
                {categories.slice(6, 9).map(renderCategoryButton)}
              </div>

              <div className="col-2 accessoriesCol align-self-center">
                <button
                  type="button"
                  className="btn btn-block btn-light border"
                  onClick={() => navigate("/accessory")}
                >
                  Accessories
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-2 filtersPanel">
                <p className="filtersTitle">Filters</p>
                <div className="applyBtnCol">
                  <Button className="applyBtn" onClick={applyFilterClicked}>
                    Apply Filters
                  </Button>
                </div>
                <Accordion defaultActiveKey="0" alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Price</Accordion.Header>
                    <Accordion.Body>
                      <div className="row justify-content-center">
                        <div className="form-group col-sm-5">
                          <label for="minPrice">Min (&euro;)</label>
                          <input
                            className="textField"
                            type="number"
                            min="0"
                            step="10"
                            id="minPrice"
                            name="minPrice"
                            placeholder="min"
                            onWheel={(e) => e.target.blur()} // prevents default input scroll behavior
                            onChange={handleFilterChange}
                          ></input>
                        </div>
                        <div className="form-group col-sm-5">
                          <label for="maxPrice">Max (&euro;)</label>
                          <input
                            className="textField"
                            type="number"
                            min="0"
                            step="10"
                            id="maxPrice"
                            name="maxPrice"
                            placeholder="max"
                            onWheel={(e) => e.target.blur()}
                            onChange={handleFilterChange}
                          ></input>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Frame Size</Accordion.Header>
                    <Accordion.Body>
                      <div className="row justify-content-center">
                        <div className="form-group col-sm-6">
                          <label for="minFrameSize">Min (cm)</label>
                          <input
                            className="textField"
                            type="number"
                            min="30"
                            max="70"
                            id="minFrameSize"
                            name="minFrameSize"
                            placeholder="min"
                            onWheel={(e) => e.target.blur()}
                            onChange={handleFilterChange}
                          ></input>
                        </div>
                        <div className="form-group col-sm-6">
                          <label for="maxFrameSize">Max (cm)</label>
                          <input
                            className="textField"
                            type="number"
                            min="0"
                            max="70"
                            id="maxFrameSize"
                            name="maxFrameSize"
                            placeholder="max"
                            onWheel={(e) => e.target.blur()}
                            onChange={handleFilterChange}
                          ></input>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Color</Accordion.Header>
                    <Accordion.Body>
                      <Form className="text-left">
                        {colors.map(renderColorCheckbox)}
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Gender</Accordion.Header>
                    <Accordion.Body>
                      <Form.Select id="gender" onChange={handleFilterChange}>
                        <option selected> </option>
                        <option>Man</option>
                        <option>Woman</option>
                        <option>Child</option>
                        <option>Unisex</option>
                      </Form.Select>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Condition</Accordion.Header>
                    <Accordion.Body>
                      <Form className="text-left">
                        {conditions.map(renderConditionCheckbox)}
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="5">
                    <Accordion.Header>Location</Accordion.Header>
                    <Accordion.Body>
                      <input
                        className="textField"
                        type="text"
                        id="location"
                        name="location"
                        onChange={handleFilterChange}
                      ></input>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="6">
                    <Accordion.Header>Rear Gears</Accordion.Header>
                    <Accordion.Body>
                      <input
                        className="textField"
                        type="number"
                        min="1"
                        max="12"
                        id="rearGears"
                        name="rearGears"
                        onWheel={(e) => e.target.blur()}
                        onChange={handleFilterChange}
                      ></input>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="7">
                    <Accordion.Header>Front Gears</Accordion.Header>
                    <Accordion.Body>
                      <input
                        className="textField"
                        type="number"
                        min="1"
                        max="3"
                        id="frontGears"
                        name="frontGears"
                        onWheel={(e) => e.target.blur()}
                        onChange={handleFilterChange}
                      ></input>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="8">
                    <Accordion.Header>Brake Type</Accordion.Header>
                    <Accordion.Body>
                      <Form.Select id="brakeType" onChange={handleFilterChange}>
                        <option selected> </option>
                        <option>Disk</option>
                        <option>Rim</option>
                      </Form.Select>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="9">
                    <Accordion.Header>Frame Material</Accordion.Header>
                    <Accordion.Body>
                      <Form.Select
                        id="frameMaterial"
                        onChange={handleFilterChange}
                      >
                        <option selected> </option>
                        <option>Aluminium</option>
                        <option>Carbon</option>
                        <option>Steel</option>
                      </Form.Select>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="10">
                    <Accordion.Header>Verification Level</Accordion.Header>
                    <Accordion.Body>
                      <Form.Select
                        id="verification"
                        onChange={handleFilterChange}
                      >
                        <option selected> </option>
                        <option value="conditionAndFrame">
                          Frame Number &amp; Condition
                        </option>
                        <option value="frame">Frame Number </option>
                        <option value="condition">Condition</option>
                        <option value="none">None</option>
                      </Form.Select>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div>
                  <VerificationLegend></VerificationLegend>
                </div>
              </div>

              <div className="col listingsPanel">
                <Row>
                  <div className="col-sm-1 align-self-center">Sort by:</div>
                  <div className="col-sm-3">
                    <button
                      type="button"
                      className="btn btn-block border"
                      id="priceLH"
                      name="priceSortBtn"
                      onClick={handleSortingCriterionChange}
                    >
                      Price (low to high)
                    </button>
                  </div>
                  <div className="col-sm-3">
                    <button
                      type="button"
                      className="btn btn-block border"
                      id="priceHL"
                      name="priceSortBtn"
                      onClick={handleSortingCriterionChange}
                    >
                      Price (high to low)
                    </button>
                  </div>
                </Row>

                {state && state.searchString ? (
                  <Row>
                    <div className="col searchInfo">
                      <span className="align-middle">
                        Showing results for{" "}
                        <strong>"{state.searchString}" </strong>
                      </span>
                      <button
                        type="button"
                        class="btn btn-danger searchCancelBtn"
                        onClick={clearSearch}
                      >
                        {" "}
                        &#10005; &#x2715;
                      </button>
                    </div>
                  </Row>
                ) : (
                  <span></span>
                )}

                {isFiltered ? (
                  <Row>
                    <div className="col filterResetCol">
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={resetFiltersAndSorting}
                      >
                        RESET FILTERS &#38; SORTING
                      </button>
                    </div>
                  </Row>
                ) : (
                  <span></span>
                )}

                <Row xs={3} md={4}>
                  {listings.map(renderCard)}
                </Row>

                <Row className="justify-content-end">
                  <button
                    type="button"
                    class="btn pageBtn"
                    onClick={prevPageClicked}
                    disabled={currentPageNum == 0}
                  >
                    &larr;
                  </button>
                  <p className="pageNumText align-self-center">
                    {" "}
                    Page {currentPageNum + 1}{" "}
                  </p>
                  <button
                    type="button"
                    class="btn pageBtn nextPageBtn"
                    onClick={nextPageClicked}
                    disabled={currentPageNum == lastPageNum.current}
                  >
                    &rarr;
                  </button>
                </Row>
              </div>
            </div>
            <div className="needHelpContainer">
              <div className="needHelp" onClick={needHelpClicked}>
                <img src={questionMarkIcon}></img>
                <p>Need help?</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Listings;
