import React from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AdminHome.module.scss";
import InfoBox from "./InfoBox";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useEffect } from "react";
import Chart from "./Chart";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";

import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";

const AdminHome = () => {
  const dispatch = useDispatch();
  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");
  const totalOrderAmount = useSelector(selectTotalOrderAmount);
  const orderCounts = useSelector(selectOrderHistory);
  const products = useSelector(selectProducts);
  useEffect(() => {
    dispatch(STORE_ORDERS(data));
    dispatch(CALC_TOTAL_ORDER_AMOUNT());
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );
  }, [fbProducts, data, dispatch]);
  const earnIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
  const productIcon = <BsCart4 size={30} color="#1f93ff" />;
  const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;
  return (
    <div>
      <div>Admin Home</div>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          count={`$${totalOrderAmount}`}
          title={"Earnings"}
          icon={earnIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          count={products.length}
          title={"Products"}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          count={orderCounts.length}
          title={"Orders"}
          icon={ordersIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default AdminHome;
