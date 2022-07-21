import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

import "../../css/ShoppingCart.css";

import Summary from "../../reusable/Summary";
import PaymentOptionsPage from "./PaymentOptionsPage";
import ShippingAddressPage from "./ShippingAddressPage";
import ShoppingCartTab from "./ShoppingCartTab";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCart } from "../../../features/cartSlice";
import { selectUser } from "../../../features/userSlice";

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

  const [products, setProducts] = useState([]);

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
      <div className="shopping-cart container bg-light content">
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
            <div className="align-self-end m-4">
              {value === 0 && (
                <Button type="button" onClick={() => handleNavigate(1)}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
