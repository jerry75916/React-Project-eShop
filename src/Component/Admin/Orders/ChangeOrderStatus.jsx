import { doc, setDoc, Timestamp } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sotreDb } from "../../../pages/firebase/config";
import Card from "../../card/Card";
import styles from "./ChangeOrderStatus.module.scss";

const ChangeOrderStatus = ({ order, id }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();
  const submitForm = () => {
    try {
      if (selectedOption === "") return;
      setDoc(doc(sotreDb, "orders", id), {
        ...order,
        orderStatus: selectedOption,
        editedAt: Timestamp.now().toDate(),
      });
      navigate("/admin/orders");
      toast.success("Order status changes successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={styles.status}>
      <Card cardClass={styles.card}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <span>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="" disabled>
                -- Choose one --
              </option>
              <option value="Order Placed...">Order Placed...</option>
              <option value="Processing...">Processing...</option>
              <option value="Shipped...">Shipped...</option>
              <option value="Delivered">Delivered</option>
            </select>
          </span>
          <button type="submit" className=" --btn --btn-primary">
            Update Status
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangeOrderStatus;
