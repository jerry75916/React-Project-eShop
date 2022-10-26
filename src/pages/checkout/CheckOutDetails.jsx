import React, { useState, useRef } from "react";
import styles from "./CHeckOutDetails.module.scss";
import Card from "../../Component/card/Card";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";
import { useNavigate } from "react-router-dom";
import CheckOutSummary from "./CheckOutSummary";

const CheckOutDetails = () => {
  const initshippingAddress = {
    name: useRef(),
    line1: useRef(),
    line2: useRef(),
    city: useRef(),
    state: useRef(),
    postal_code: useRef(),
    phone: useRef(),
  };
  const initbillingAddress = {
    name: useRef(),
    line1: useRef(),
    line2: useRef(),
    city: useRef(),
    state: useRef(),
    postal_code: useRef(),
    phone: useRef(),
  };

  const [shippingAddress, setShippingAddress] = useState({
    ...initshippingAddress,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initbillingAddress,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(
      SAVE_SHIPPING_ADDRESS({
        name: shippingAddress.name.current.value,
        line1: shippingAddress.line1.current.value,
        line2: shippingAddress.line2.current.value,
        city: shippingAddress.city.current.value,
        state: shippingAddress.state.current.value,
        postal_code: shippingAddress.postal_code.current.value,
        phone: shippingAddress.phone.current.value,
        country: shippingAddress.country,
      })
    );
    dispatch(
      SAVE_BILLING_ADDRESS({
        name: billingAddress.name.current.value,
        line1: billingAddress.line1.current.value,
        line2: billingAddress.line2.current.value,
        city: billingAddress.city.current.value,
        state: billingAddress.state.current.value,
        postal_code: billingAddress.postal_code.current.value,
        phone: billingAddress.phone.current.value,
        country: billingAddress.country,
      })
    );
    navigate("/checkout");
  };
  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>CheckOut Details</h2>
        <form onSubmit={handlesubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Address</h3>
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Recipient Name"
                required
                name="name"
                ref={shippingAddress.name}
                // value={shippingAddress.name}
                // onChange={(e) => handleshipping(e)}
              />
              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 1"
                required
                name="line1"
                ref={shippingAddress.line1}
                // value={shippingAddress.line1}
                // onChange={(e) => handleshipping(e)}
              />
              <label>Address line 2</label>
              <input
                type="text"
                placeholder="Address line 2"
                name="line2"
                ref={shippingAddress.line2}
                // value={shippingAddress.line2}
                // onChange={(e) => handleshipping(e)}
              />
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                ref={shippingAddress.city}
                // value={shippingAddress.city}
                // onChange={(e) => handleshipping(e)}
              />
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                required
                name="state"
                ref={shippingAddress.state}
                // value={shippingAddress.state}
                // onChange={(e) => handleshipping(e)}
              />
              <label>Postal code</label>
              <input
                type="text"
                placeholder="Postal code"
                required
                name="postal_code"
                ref={shippingAddress.postal_code}
                // value={shippingAddress.postal_code}
                // onChange={(e) => handleshipping(e)}
              />
              {/* COUNTRY INPUT */}
              <CountryDropdown
                className={styles.select}
                valueType="short"
                name="country"
                // ref={shippingAddress.country}

                value={shippingAddress.country}
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    country: e,
                  });
                }}
               
              />
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                ref={shippingAddress.phone}
               
              />
            </Card>
            {/* BILLING ADDRESS */}
            <Card cardClass={styles.card}>
              <h3>Billing Address</h3>
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                ref={billingAddress.name}
                // value={billingAddress.name}
                // onChange={(e) => handlebilling(e)}
              />
              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 1"
                required
                name="line1"
                ref={billingAddress.line1}
                // value={billingAddress.line1}
                // onChange={(e) => handlebilling(e)}
              />
              <label>Address line 2</label>
              <input
                type="text"
                placeholder="Address line 2"
                name="line2"
                ref={billingAddress.line2}
                // value={billingAddress.line2}
                // onChange={(e) => handlebilling(e)}
              />
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                ref={billingAddress.city}
                // value={billingAddress.city}
                // onChange={(e) => handlebilling(e)}
              />
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                required
                name="state"
                ref={billingAddress.state}
                // value={billingAddress.state}
                // onChange={(e) => handlebilling(e)}
              />
              <label>Postal code</label>
              <input
                type="text"
                placeholder="Postal code"
                required
                name="postal_code"
                ref={billingAddress.postal_code}
                // value={billingAddress.postal_code}
                // onChange={(e) => handlebilling(e)}
              />
              {/* COUNTRY INPUT */}
              <CountryDropdown
                className={styles.select}
                valueType="short"
                // ref={billingAddress.country}

                value={billingAddress.country}
                onChange={(e) => {
                  setBillingAddress({
                    ...billingAddress,
                    country: e,
                  });
                }}
              />
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                ref={billingAddress.phone}
                // value={billingAddress.phone}
                // onChange={(e) => handlebilling(e)}
              />
              <button type="submit" className="--btn --btn-primary">
                Proceed To Checkout
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckOutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckOutDetails;
