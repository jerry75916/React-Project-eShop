import styles from "./CheckOutForm.module.scss";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Card from "../../Component/card/Card";
import CheckOutSummary from "./CheckOutSummary";
import spinnerImg from "../../assets/spinner.jpg";
import { toast } from "react-toastify";
import { sotreDb } from "../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import { selectemail, selectuserID } from "../../redux/slice/authSlice";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { CALCULATE_TOTALQUANTITY } from "../../redux/slice/cartSlice";
export default function CheckOutForm() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const userID = useSelector(selectuserID);
  const userEmail = useSelector(selectemail);
  const CartItems = useSelector(selectCartItems);
  const ShippingAddress = useSelector(selectShippingAddress);
  const CartTotalAmount = useSelector(selectCartTotalAmount);
  const navigate = useNavigate();
  const SaveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: CartTotalAmount,
      orderStatus: "Order Placed...",
      CartItems,
      ShippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      // Add a new document with a generated id.
      addDoc(collection(sotreDb, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      navigate("/checkout-success");
      toast.success("Order Saved");
    } catch (e) {
     
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            SaveOrder();
          }
        }
      });
    setIsLoading(false);
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Check Out</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckOutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Stripe Checkout</h3>
              <PaymentElement className={styles["payment-element"]} />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={styles.button}
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner">
                      <img
                        src={spinnerImg}
                        alt="Loading..."
                        style={{ width: "20px" }}
                      />
                    </div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {message && <div id={styles["payment-message"]}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
}
