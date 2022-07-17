import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ShoppingCartItem from "./ShoppingCartItem";
import { selectCart } from "../../../features/cartSlice";
import { removeFromCart } from "../../../features/cartSlice";
import { useSelector } from "react-redux";
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
  const handleInsurance = (productKey, insuranceKey) => {
    console.log("insurance", productKey, insuranceKey);
    const newState = [...products];
    let newValue = products[productKey];
    newValue.insurance = insProviders[insuranceKey];
    newValue.insuranceKey = insuranceKey;
    newValue.insuranceName = getInsuranceNameFromValue(insuranceKey);
    newState[productKey] = newValue;
    setProducts(newState);
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
    console.log(products);
  };

  return (
    <React.Fragment>
      <CssBaseline />
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
        <Button
          style={{ backgroundColor: "#2e6076", color: "white" }}
          type="button"
          onClick={() => handleNavigate(1)}
        >
          Next
        </Button>
      </div>
    </React.Fragment>
  );
}
