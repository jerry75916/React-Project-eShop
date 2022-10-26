import React from "react";
import styles from "./CheckOutSummary.module.scss";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../../Component/card/Card";
const CheckOutSummary = () => {
  const CartItems = useSelector(selectCartItems);
  const CartTotalAmount = useSelector(selectCartTotalAmount);
  const CartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div>
      <h3>CheckOut Summary</h3>
      {CartItems.length === 0 ? (
        <>
          <p>No item in your cart.</p>
          <button className="--btn">
            <Link to="/#products">Back To Shop</Link>
          </button>
        </>
      ) : (
        <div>
          <p>
            <b>Cart Items(s):{CartTotalQuantity}</b>
          </p>
          <div className={styles.text}>
            <h4>SubTotal</h4>
            <h3>{`$${CartTotalAmount.toFixed(2)}`}</h3>
          </div>
          {CartItems.map((cart, index) => {
            const { id, name, price, Quantity } = cart;
            return (
              <Card key={id} cardClass={styles.card}>
                <h4>Product: {name}</h4>
                <p>Quantity: {Quantity}</p>
                <p>Unit price: {price}</p>
                <p>Set price: {price * Quantity}</p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CheckOutSummary;
