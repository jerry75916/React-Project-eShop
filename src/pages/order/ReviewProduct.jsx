import React, { useState, useRef } from "react";
import styles from "./ReviewProducts.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts } from "../../redux/slice/productSlice";
import { selectuserID, selectuserName } from "../../redux/slice/authSlice";
import { useParams } from "react-router-dom";
import Card from "../../Component/card/Card";
import StarsRating from "react-star-rate";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { sotreDb } from "../firebase/config";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { useEffect } from "react";
import Loader from "../../Component/loader/Loader";




const ReviewProduct = () => {
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  // const [review, setReview] = useState("");
  // const Products = useSelector(selectProducts);
  const [Product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const UserID = useSelector(selectuserID);
  const UserName = useSelector(selectuserName);
  const { document, Loading } = useFetchDocument("products", id);
  const textContent = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const ReviewConfig = {
      UserID,
      UserName,
      productID: id,
      rate,
      review: textContent.current.value,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      // Add a new document with a generated id.
      addDoc(collection(sotreDb, "reviews"), ReviewConfig);
      setRate(0);
      textContent.current.value = "";
      toast.success("Review submitted success!");
    } catch (e) {
   
      toast.error(e.message);
    }
  };

  useEffect(() => {
    setProduct(document);
    setIsLoading(Loading);
  }, [Loading, document]);
  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`container ${styles.review}`}>
          <h2>Review Products</h2>
          <p>
            <b>Product Name:</b>
            {Product.name}
          </p>
          <img src={Product.imageURL} alt={Product.name} />
          <Card cardClass={styles.card}>
            <form onSubmit={submitForm}>
              <label>Rating:</label>
              <StarsRating
                value={rate}
                onChange={(value) => {
                  setRate(value);
                }}
              />
              <label>Review:</label>
              <textarea col="30" rows="10" required ref={textContent} />
              <button type="submit" className="--btn --btn-primary">
                Submit Review
              </button>
            </form>
          </Card>
        </div>
      )}
    </section>
  );
};

export default ReviewProduct;
