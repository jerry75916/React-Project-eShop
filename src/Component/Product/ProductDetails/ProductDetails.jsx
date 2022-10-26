import React, { useState, useEffect, useCallback } from "react";
import styles from "./ProductDetails.module.scss";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import {
  storage,
  sotreDb,
  StorageeRef,
  StorageDeleObj,
} from "../../../pages/firebase/config";
import Loader from "../../loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECRESE_CART,
  selectCartItems,
  CALCULATE_TOTALQUANTITY,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";
const ProductDetails = () => {
  const { id } = useParams();
  const CartItems = useSelector(selectCartItems);
  const ThisCartItem = CartItems.find((item) => item.id === id);
  const [isloading, setisLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };
  const decreaseCart = (product) => {
    dispatch(DECRESE_CART(product));
  };
  const { document, Loading } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filterReview = data.filter((review) => review.productID === id);
  useEffect(() => {
    setProduct(document);
    setisLoading(Loading);
  }, [Loading, document]);

  useEffect(() => {
    dispatch(CALCULATE_TOTALQUANTITY());
  }, [dispatch, CartItems]);
  return (
    <div>
      {isloading ? (
        <Loader />
      ) : (
        <section>
          <div className={`container ${styles.product}`}>
            <h2>Product Details</h2>
            <div>
              <Link to="/#products">&larr; Back To Products</Link>
            </div>
            {
              <div className={styles.details}>
                <div className={styles.img}>
                  <img src={product.imageURL} alt={product.name} />
                </div>
                <div className={styles.content}>
                  <h3>{product.name}</h3>
                  <p className={styles.price}>{`$${product.price}`}</p>
                  <p>{product.desc}</p>
                  <p>
                    <b>SKU</b> {product.id}
                  </p>
                  <p>
                    <b>Brand</b> {product.brand}
                  </p>
                  {ThisCartItem ? (
                    <div className={styles.count}>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{ThisCartItem.Quantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </div>
                  ) : null}

                  <button
                    className="--btn --btn-danger"
                    onClick={() => addToCart(product)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            }
            <Card cardClass={styles.card}>
              <h3>Product Reviews</h3>
              <div>
                {filterReview.length === 0 ? (
                  <p>There is no review for theis product</p>
                ) : (
                  filterReview.map((reviews, index) => {
                    const { UserName, rate, review, reviewDate } = reviews;
                    return (
                      <div key={index} className={styles.rate}>
                        <StarsRating value={rate} disabled="true" />
                        <p>{review}</p>
                        <span>
                          <b>{reviewDate}</b>
                        </span>
                        <br />
                        <span>
                          <b>by: {UserName}</b>
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
