import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 15,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
}));

function ShoppingCartItem({ key, product }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={product.image}
        title="Live from space album cover"
      />
      <CardContent className={classes.content}>
        {/* <CardMedia
          className={classes.cover}
          image="https://source.unsplash.com/random"
          title="Live from space album cover"
        /> */}
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {product.category}
        </Typography>
        <Typography variant="div" component="h2">
          {product.name}
        </Typography>
        <Typography variant="subtitle2">
          <hr />
        </Typography>
        <Grid container>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <Typography variant="body1" component="div">
              Quantity
            </Typography>
          </Grid>
          {product.category =="Accessory" && (
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <Typography variant="h6" component="div">
              {product.quantity}
            </Typography>
          </Grid>
          )}
          {product.category == "Bike" && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Select defaultValue={10} label="Select Your Insurance Type">
                <MenuItem value={10}>No Insurance Selected</MenuItem>
                <MenuItem value={20}>Generic Company Insurance 1</MenuItem>
                <MenuItem value={30}>Generic Company Insurance 2</MenuItem>
              </Select>
            </Grid>
          )}

          <Grid item xs={10} sm={9} md={10} lg={10}>
            <Typography
              variant="body1"
              component="div"
              style={{ fontWeight: "bold" }}
            >
              Price Per Item
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6" component="div" color="secondary">
              €{product.price}
            </Typography>
          </Grid>
          <Grid item xs={10}/>
          <Grid item xs={2} className='cartItem__actions'>
            <button
              onClick={() => dispatch(removeFromCart(cart.id))}
              className='actions__deleteItemBtn'
            >
              <DeleteIcon/>
            </button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ShoppingCartItem;
