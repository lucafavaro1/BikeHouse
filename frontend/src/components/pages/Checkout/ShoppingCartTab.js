import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ShoppingCartItem from "./ShoppingCartItem";

export default function ShoppingCartTab({ products }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={7} lg={12}>
            <Grid container>
              <Grid item xs>
                {products.map((product, index) => (
                  <ShoppingCartItem key={index} product={product} />
                ))}
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={5} lg={3}>
            <Summary />
          </Grid> */}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
