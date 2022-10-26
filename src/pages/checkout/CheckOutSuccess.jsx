import React from "react";
import styles from "./CheckOutSuccess.module.scss";
import { Link } from "react-router-dom";

const CheckOutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>CheckOut Successful</h2>
        <p>Thanks you for your purchases</p>
        <br />
        <button className="--btn --btn-primary">
          <Link to="/Order-history" style={{ color: "#fff" }}>
            View Order Status{" "}
          </Link>
        </button>
      </div>
    </section>
  );
};

export default CheckOutSuccess;
