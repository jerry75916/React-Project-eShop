import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTALQUANTITY,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { selectemail } from "../../redux/slice/authSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../../redux/slice/checkoutSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const CheckOut = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("Initializing Checkout...");
  const [clientSecret, setClientSecret] = useState("");
  const CartItems = useSelector(selectCartItems);
  const CartTotalAmount = useSelector(selectCartTotalAmount);
  const CustomEmail = useSelector(selectemail);
  const ShippingAddress = useSelector(selectShippingAddress);
  const BillingAddress = useSelector(selectBillingAddress);
  const CartTotalQuantity = useSelector(selectCartTotalQuantity);
  const description = `eshop payment: email: ${CustomEmail}, Amount: ${CartTotalAmount}`;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    //local "http://localhost:4242/create-payment-intent"
    fetch("https://jerry-react-shop.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: CartItems,
        userEmail: CustomEmail,
        shipping: ShippingAddress,
        billing: BillingAddress,
        description: description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Fail to initialize checkout");
        toast.error("Something went wrong");
      });
  }, []);
  // useEffect(() => {
  //    dispatch(CALCULATE_SUBTOTAL());
  //    dispatch(CALCULATE_TOTALQUANTITY());
  // }, [dispatch]);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      )}
    </>
  );
};

export default CheckOut;
