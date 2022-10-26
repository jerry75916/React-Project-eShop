import React, { useEffect } from "react";
import styles from "./OrderHistory.module.scss";
import "./OrderHistory.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderHistory, STORE_ORDERS } from "../../redux/slice/orderSlice";
import { selectuserID } from "../../redux/slice/authSlice";
import Loader from "../../Component/loader/Loader";
import { useNavigate } from "react-router-dom";
const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);

  const userID = useSelector(selectuserID);
  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);
  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const userFilter = orders.filter((user) => user.userID === userID);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {userFilter.length === 0 ? (
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
                  {userFilter.map((order, index) => {
                    const {
                      orderTime,
                      id,
                      orderStatus,
                      orderAmount,
                      orderDate,
                    } = order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
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
    </section>
  );
};

export default OrderHistory;
