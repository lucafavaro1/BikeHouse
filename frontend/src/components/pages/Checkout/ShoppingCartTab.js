import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ShoppingCartItem from "./ShoppingCartItem";
import "../../css/Checkout.css";
import { addToCart, selectCart, updateCart } from "../../../features/cartSlice";
import { removeFromCart } from "../../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getInsuranceNameFromValue,
  insProviders,
} from "../globals/GlobalObjects";
import { Button } from "@material-ui/core";

export default function ShoppingCartTab({
  products,
  setProducts,
  handleNavigate,
}) {
  const dispatch = useDispatch();

  const handleInsurance = (productKey, insuranceKey) => {
    console.log("insurance", productKey, insuranceKey);
    const newState = [...products];
    let newValue = products[productKey];
    newValue.insurance = insProviders[insuranceKey];
    newValue.insuranceKey = insuranceKey;
    newValue.insuranceName = getInsuranceNameFromValue(insuranceKey);
    newState[productKey] = newValue;
    setProducts(newState);
    dispatch(updateCart(newValue));
    console.log(products);
  };

  const handleShipping = (productKey, shippingrate, shippingType) => {
    console.log("ship", productKey, shippingrate);
    const newState = [...products];
    let newValue = products[productKey];
    newValue.shipping = shippingrate;
    newValue.deliveryType = shippingType;
    newState[productKey] = newValue;
    setProducts(newState);
    dispatch(updateCart(newValue));
    console.log(products);
  };

  const handleSetQuantity = (productKey, quantity) => {
    const newState = [...products];
    let newValue = products[productKey];
    newValue.quantity = quantity;
    newState[productKey] = newValue;
    setProducts(newState);
    dispatch(updateCart(newValue));
  };

  return (
    <div className="checkout">
      <React.Fragment>
        <CssBaseline />
        {products.length == 0 ? (
          <h1 className="mt-5">Your basket is empty!</h1>
        ) : (
          <>
            <Container fixed>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={7} lg={12}>
                  <Grid container>
                    <Grid item xs>
                      {products.map((product, index) => (
                        <ShoppingCartItem
                          key={index}
                          productKey={index}
                          product={product}
                          handleInsurance={handleInsurance}
                          handleShipping={handleShipping}
                          handleSetQuantity={handleSetQuantity}
                        />
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={5} lg={3}>
            <Summary />
          </Grid> */}
              </Grid>
            </Container>
            <div className="align-self-end m-4">
              <Button type="button" onClick={() => handleNavigate(1)}>
                Next
              </Button>
            </div>
          </>
        )}
      </React.Fragment>
    </div>
  );
}
