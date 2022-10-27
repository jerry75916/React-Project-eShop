import React from "react";
import styles from "./Chart.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Card from "../../card/Card";
import { selectOrderHistory } from "../../../redux/slice/orderSlice";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Chart = () => {
  const orders = useSelector(selectOrderHistory);
  const orderString = [
    "Order Placed...",
    "Processing...",
    "Shipped...",
    "Delivered",
  ];
  const getOrderCount = (orderStatus) => {
    return orders.filter((order) => order.orderStatus === orderStatus).length;
  };
  const statusCountArr = orderString.map((str) => {
    return getOrderCount(str);
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const data = {
    labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Order count",
        data: statusCountArr,
        backgroundColor: "rgba(10, 100, 32, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default Chart;
