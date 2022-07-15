import React, { useState } from "react";
import styles from "../css/cartItem.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from "react-redux";
import {removeFromCart} from "../../features/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = (item) => {
  const [input, setInput] = useState(1);
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    // adjustQty(item.id, e.target.value);
  };
  console.log(item.item.price)
  return (
    <div className={styles.cartItem}>
      {/* <img
        className={styles.cartItem__image}
        src={item.image}
        // alt={item.title}
      /> */}
      <div className={styles.cartItem__details}>
        <p className={styles.details__title}>{item.item.brand}</p>
        <p className={styles.details__desc}>{item.item.model}</p>
        <p className={styles.details__price}>$ {item.item.price}</p>
      </div>
      {/* <div className={styles.cartItem__actions}>
        <div className={styles.cartItem__qty}>
          <label htmlFor="qty">Qty</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={input}
            onChange={onChangeHandler}
          />
        </div>
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className={styles.actions__deleteItemBtn}
        >
          <DeleteIcon sx={{ my: 2, mx:1,  color: 'white', display: 'block', fontSize: 'medium', ':hover': {color: 'gold'}  }}/>
        </button>
      </div> */}
    </div>
  );
};

export default CartItem;
