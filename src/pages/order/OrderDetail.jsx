import React, { useEffect } from "react";
import styles from "./OrderDetail.module.scss";
import { useParams } from "react-router-dom";
import Loader from "../../Component/loader/Loader";
import { Link } from "react-router-dom";
import { fetchOrderById } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //   const [order, setOrder] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const { document, Loading } = useFetchDocument("orders", id);
  const singleOrder = useSelector((state) => state.orders.singleOrder);

  //   useEffect(() => {
  //     setOrder(document);
  //     setIsLoading(Loading);
  //   }, [document, Loading]);
  useEffect(() => {
    dispatch(fetchOrderById({ TableName: "orders", id }));
  }, [dispatch]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history">&larr; Back To Orders</Link>
        </div>
        <br />
        {!singleOrder ? (
          <Loader />
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
            <br />
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
                      <td className={styles.icons}>
                        <Link to={`/review-product/${id}`}>
                          <button className="--btn --btn-primary">
                            Review Product
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetail;
