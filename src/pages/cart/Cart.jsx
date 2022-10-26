import React, { useState, useEffect } from "react";
import styles from "./Cart.module.scss";
import "./confirm.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_TO_CART,
  DECRESE_CART,
  REMOVEFROME_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTALQUANTITY,
  SAVE_URL,
} from "../../redux/slice/cartSlice";
import ConfirmBox from "../../Component/ConfirmBox/ConfirmBox";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../Component/card/Card";
import { confirmAlert } from "react-confirm-alert"; // Import
import { selectIsLoggedin } from "../../redux/slice/authSlice";
import Checkout from "../checkout/CheckOut";
const Cart = () => {
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [delObj, setdelObj] = useState(null);
  const cartItems = useSelector(selectCartItems);
  const CartTotalAmount = useSelector(selectCartTotalAmount);
  const CartTotalQuantity = useSelector(selectCartTotalQuantity);
  const IsLoggined = useSelector(selectIsLoggedin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };

  const decreaseCart = (product) => {
    dispatch(DECRESE_CART(product));
  };
  const delProduct = (product) => {
    setdelObj(product);
    setDisplayConfirm(true);
  };
  const DelProd = (status) => {
    setDisplayConfirm(false);

    if (status) {
      removeFromCart(delObj);
    }
  };

  const removeFromCart = (product) => {
    dispatch(REMOVEFROME_CART(product));
  };
  const RemoveAllFromCart = () => {
    confirmAlert({
      title: "Confirm to Remove all items",
      message: "Are you sure to remove all items?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(CLEAR_CART());
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
    //
  };

  const url = window.location.href;
  const checkOut = () => {
    if (IsLoggined) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTALQUANTITY());
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);
  return (
    <section>
      {displayConfirm ? (
        <ConfirmBox imgUrl={delObj.imageURL} deletefun={DelProd} />
      ) : (
        ``
      )}
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, Quantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{Quantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * Quantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => delProduct(cart)}
                          //onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button
                className="--btn --btn-danger"
                onClick={() => RemoveAllFromCart()}
              >
                Clear Cart
              </button>
              <div>
                <div>
                  <Link to="/#products">&larr; Continue shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b> {`Cart item(s): ${CartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`$${CartTotalAmount.toFixed(2)}`}</h3>
                  </div>
                  <p>Tax an shipping calculated at checkout</p>
                  <button
                    className="--btn --btn-primary --btn-block"
                    onClick={checkOut}
                  >
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
