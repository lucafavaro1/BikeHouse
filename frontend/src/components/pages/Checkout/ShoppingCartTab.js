//function to laod the shopping cart tab within the checkout page

import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { React } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../../../features/cartSlice";
import "../../css/Checkout.css";
import { getInsuranceNameFromValue, insProviders } from "../../globals/GlobalObjects";
import ShoppingCartItem from "./ShoppingCartItem";

export default function ShoppingCartTab({
  products,
  setProducts,
  handleNavigate,
}) {
  const dispatch = useDispatch();

  //function to handle insurance selection for each item
  const handleInsurance = (productKey, insuranceKey) => {
    const newState = [...products];
    let newValue = products[productKey];
    newValue.insurance = insProviders[insuranceKey];
    newValue.insuranceKey = insuranceKey;
    newValue.insuranceName = getInsuranceNameFromValue(insuranceKey);
    newState[productKey] = newValue;
    setProducts(newState);
    dispatch(updateCart(newValue));
  };

  //function to handle shipping selection for each item
  const handleShipping = (productKey, shippingrate, shippingType) => {
    const newState = [...products];
    let newValue = products[productKey];
    newValue.shipping = shippingrate;
    newValue.deliveryType = shippingType;
    newState[productKey] = newValue;
    setProducts(newState);
    dispatch(updateCart(newValue));
  };

  //function to handle quantity selection for each item
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
        {products.length === 0 ? (
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
              </Grid>
            </Container>
            <div className="align-self-end m-4">
              <Button type="button" onClick={() => handleNavigate(1)}>
                Next
              </Button>
            </div>
          </>
        )}
    </div>
  );
}
