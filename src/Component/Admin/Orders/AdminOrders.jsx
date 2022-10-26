import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import {
  selectOrderHistory,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import Loader from "../../loader/Loader";
import styles from "./AdminOrders.module.scss";

const AdminOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);
  const changeOrderStatus = (id) => {
    navigate(`/admin/order-details/${id}`);
  };
  return (
    <>
      <div className={styles.order}>
        <h2>Your Order History</h2>
        <p>
          Open an order to <b>Change order status</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {orders.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      orderTime,
                      id,
                      orderStatus,
                      orderAmount,
                      orderDate,
                    } = order;
                    return (
                      <tr key={id} onClick={() => changeOrderStatus(id)}>
                        <td>{index + 1}</td>
                        <td>{`${orderDate} at ${orderTime}`}</td>
                        <td>{id}</td>
                        <td>${orderAmount}</td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default AdminOrders;
