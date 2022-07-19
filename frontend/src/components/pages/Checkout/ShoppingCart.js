import React, { useEffect } from "react";
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
import { selectCart } from "../../../features/cartSlice";
import { removeFromCart } from "../../../features/cartSlice";
import { useSelector } from "react-redux";
import { useSelect } from "@mui/base";
import axios from "axios";
import { selectUser } from "../../../features/userSlice";
import { Navigate } from "react-router-dom";

function ShoppingCart() {
  const [value, setValue] = React.useState(0);

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

  const handleNavigate = (index) => {
    console.log(value - index);
    if (value + index === -1 || value + index === 3) {
      //do nothing. we are at the end of the tabs or at the beginning of the tabs
    } else {
      setValue(value + index);
    }
  };

  const cart = useSelector(selectCart);
  let productArray = [];
  cart.forEach((item) => {
    productArray.push({
      ...item,
    });
  });
  const [products, setProducts] = useState(productArray);

  const [totalPrice, setTotalPrice] = useState(0);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    streetName: "",
    houseNumber: 0,
    city: "",
    phoneNumber: "",
    zip: "",
    country: "",
    addressLine2: "",
  });

  useEffect(() => {
    let productArray = [];
    cart.forEach((item) => {
      console.log("item is ", item);
      productArray.push({ ...item });
    });
    console.log("Product array is ", productArray);
    setProducts(productArray);
  }, [cart]);

  const user = useSelector(selectUser);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="container bg-light content">
        <div className="row">
          <div className="col-md-8">
            <Tabs
              className="mt-2"
              value={value}
              variant="fullWidth"
              aria-label="disabled tabs example"
              TabIndicatorProps={{ style: { backgroundColor: "#2e6076" } }}
            >
              <Tab label="Shopping Cart" style={{ color: "#2e6076" }} />
              <Tab label="Address" style={{ color: "#2e6076" }} />
              <Tab label="Payment" style={{ color: "#2e6076" }} />
            </Tabs>
            <TabPanel value={value} index={0}>
              {
                <ShoppingCartTab
                  products={products}
                  setProducts={setProducts}
                  handleNavigate={handleNavigate}
                />
              }
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ShippingAddressPage
                address={address}
                setAddress={setAddress}
                handleNavigate={handleNavigate}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PaymentOptionsPage
                handleNavigate={handleNavigate}
                products={products}
                address={address}
                user={user}
                totalPrice={totalPrice}
              />
            </TabPanel>
          </div>

          <div className="col-md-4 mt-5 mb-5">
            <Summary products={products} setTotalPrice={setTotalPrice} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
