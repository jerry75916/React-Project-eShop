import React, { useEffect, useState } from "react";
import ChangeOrderStatus from "./ChangeOrderStatus";
import styles from "./OrderDetails.module.scss";
import spinnerImg from "../../../assets/spinner.jpg";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../../../redux/slice/orderSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleOrder = useSelector((state) => state.orders.singleOrder);
  useEffect(() => {
    dispatch(fetchOrderById({ TableName: "orders", id }));
  }, [dispatch]);
  return (
    <>
      <div className={styles.table}>
        <h2>Order Details</h2>
        <div>
          <Link to="/admin/orders">&larr; Back To Orders</Link>
        </div>
        <br />
        {!singleOrder ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID</b> {singleOrder.id}
            </p>
            <p>
              <b>Order Amount</b> ${singleOrder.orderAmount}
            </p>
            <p>
              <b>Order Status</b> {singleOrder.orderStatus}
            </p>
            <p>
              <b>Shipping Address</b>
              <br />
              Address: {singleOrder.ShippingAddress.line1},
              {singleOrder.ShippingAddress.line2},{" "}
              {singleOrder.ShippingAddress.city}
              <br />
              State: {singleOrder.ShippingAddress.state}
              <br />
              Country: {singleOrder.ShippingAddress.country}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {singleOrder.CartItems.map((cart, index) => {
                  const { id, name, price, imageURL, Quantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
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
                      <td>{Quantity}</td>
                      <td>{(price * Quantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <ChangeOrderStatus order={singleOrder} id={id} />
      </div>
    </>
  );
};

export default OrderDetails;
