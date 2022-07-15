import React from "react";
import { Button, Row, Nav, Card, Modal } from "react-bootstrap";
import { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ShoppingCartTab from "./ShoppingCartTab";
import ShippingAddressPage from "./ShippingAddressPage";
import { Divider } from "@material-ui/core";
import PaymentOptionsPage from "./PaymentOptionsPage";
import Summary from "../../reusable/Summary";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function ShoppingCart() {
  const [value, setValue] = React.useState(2);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNavigate = (index) => {
    console.log(value - index);
    if (value + index === -1 || value + index === 3) {
      //do nothing. we are at the end of the tabs or at the beginning of the tabs
    } else {
      setValue(value + index);
    }
  };
  const [shippingRate, setShippingRate] = useState(0);
  const [products, setProducts] = useState([
    {
      id: 1,
      category: "Bike",
      name: "BestBikeEver",
      price: 200,
      quantity: 1,
      image:
        "https://static.spektrum.de/fm/912/f2000x857/STScI-01G79R4PQEKTHV094X9767ASV8.jpg",
    },
    {
      id: 2,
      category: "Bike",
      name: "BestBikeEver",
      price: 200,
      quantity: 2,
      image:
        "https://static.spektrum.de/fm/912/f2000x857/STScI-01G79R4PQEKTHV094X9767ASV8.jpg",
    },
    {
      id: 3,
      category: "Accessory",
      name: "BEST ACCESSORY EVER",
      price: 200,
      quantity: 2,
      image:
        "https://static.spektrum.de/fm/912/f2000x857/STScI-01G79R4PQEKTHV094X9767ASV8.jpg",
    },
  ]);

  return (
    <>
      <div className="container bg-light ">
        <div className="row">
          <div className="col-md-8">
            <Tabs
              value={value}
              variant="fullWidth"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab label="Shopping Cart" />
              <Tab label="Address" />
              <Tab label="Payment" />
            </Tabs>
            <TabPanel value={value} index={0}>
              {<ShoppingCartTab products={products} />}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ShippingAddressPage setShippingRate={setShippingRate} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PaymentOptionsPage />
            </TabPanel>
            <Divider />
          </div>

          <div className="col-md-4 mt-5 mb-5">
            <Summary products={products} shippingRate={shippingRate} />
          </div>
        </div>

        <div className="m-4">
          {value != 2 && (
            <Button
              style={{ backgroundColor: "#2e6076" }}
              type="button"
              onClick={() => handleNavigate(1)}
            >
              Next
            </Button>
          )}
          {value === 2 && (
            <Button style={{ backgroundColor: "#2e6076" }} type="button">
              Complete Payment
            </Button>
          )}

          {value != 0 && (
            <Button
              onClick={() => handleNavigate(-1)}
              className="ml-3"
              style={{ backgroundColor: "#2e6076" }}
              type="button"
            >
              Back
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;