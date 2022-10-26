import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "./ProductFilter/ProductFilter";
import ProductList from "./ProductList/ProductList";
import { useSelector, useDispatch } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectProducts, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import { GET_PRICE_RANGE } from "../../redux/slice/productSlice";
import Loader from "../loader/Loader";
import { FaCogs } from "react-icons/fa";
import Pagination from "../pagation/Pagination";
const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const Products = useSelector(selectProducts);
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <section>
      <h2>Product</h2>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? <Loader /> : <ProductList products={Products} />}
          <div
            className={styles.icon}
            onClick={() => setShowFilter(!showFilter)}
          >
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? `Hide Filter` : `Show Filter`}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
