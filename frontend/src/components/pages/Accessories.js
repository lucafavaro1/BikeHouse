// function to load the accessories page

import React, { useState, useEffect, useRef } from "react";
import { Card, Row } from "react-bootstrap";
import AccessoryDescription from "../reusable/AccessoryDescription";
import Axios from "axios";
import "../css/Accessories.css";

function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [nextAccessories, setNextAccessories] = useState([]);
  const parameters = useRef({});
  const lastPageNum = useRef(Infinity);
  const [currentPageNum, setCurrentPageNum] = useState(0);

  useEffect(() => {
    getAccessories();
  }, []);

  //function to get accessories from DB
  async function getAccessories(
    page = 0,
    shouldPreFetchNextPage = true,
    shouldUsePreFetchedNextPage = true
  ) {
    parameters.current.page = page;

    if (nextAccessories.length !== 0 && shouldUsePreFetchedNextPage) {
      // if there are already pre-fetched listings
      setAccessories(nextAccessories);
    } else {
      try {
        const response = await Axios.get("http://localhost:3001/accessory", {
          params: parameters.current,
        });
        setAccessories(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (shouldPreFetchNextPage) {
      parameters.current.page = page + 1; // increment page number to pre-fetch the next page

      try {
        const response = await Axios.get("http://localhost:3001/accessory", {
          params: parameters.current,
        });
        setNextAccessories(response.data);

        if (response.data.length === 0) {
          // check if last page is reached
          lastPageNum.current = page;
        }
      } catch (error) {
        console.log(error);
      }

      parameters.current.page = page;
    }
  }

  const nextPageClicked = async (event) => {
    if (currentPageNum === lastPageNum.current) {
      return;
    }

    getAccessories(currentPageNum + 1);
    setCurrentPageNum(currentPageNum + 1);
  };

  const prevPageClicked = async (event) => {
    if (currentPageNum === 0) {
      return;
    }

    getAccessories(currentPageNum - 1, false);
    setCurrentPageNum(currentPageNum - 1);
  };

  /** Renders a new Card component for each accessory */
  const renderCard = (accessory, index) => {
    return (
      <Card key={index}>
        <Card.Img variant="top" src={accessory.photos[0].url} />
        <Card.Body>
          <Card.Text>
            <AccessoryDescription accessory={accessory}></AccessoryDescription>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="accessories content">
      <div className="row">
        <h1 className="pageTitle">Accessories</h1>
      </div>

      <div className="row">
        <div className="col accessoriesPanel">
          <Row xs={4} md={5}>
            {accessories.map(renderCard)}
          </Row>

          <Row className="justify-content-end">
            <button
              type="button"
              class="btn pageBtn"
              onClick={prevPageClicked}
              disabled={currentPageNum === 0}
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
              disabled={currentPageNum === lastPageNum.current}
            >
              &rarr;
            </button>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Accessories;
