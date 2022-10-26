import React, { useState, useEffect } from "react";
import styles from "./ProductFilter.module.scss";
import { selectProducts } from "../../../redux/slice/productSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  CHANGE_CATEGORY,
  CHANGE_BRAND,
  CHANGE_PRICE,
} from "../../../redux/slice/filterSlice";
import {
  selectMinPrice,
  selectMaxPrice,
} from "../../../redux/slice/productSlice";
const ProductFilter = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const [price, setPrice] = useState("3000");
  const [Category, setCategory] = useState("All");
  const [Brand, setBrand] = useState("All");
  const allcategories = [
    "All",
    ...new Set(
      products.map((product) => {
        return product.category;
      })
    ),
  ];
  const allbrands = [
    "All",
    ...new Set(
      products.map((product) => {
        return product.brand;
      })
    ),
  ];
  const changeCategory = (cat) => {
    setCategory(cat);
    dispatch(CHANGE_CATEGORY({ products, Category: cat }));
  };
  const changeBrand = (e) => {
    const targetBrand = e.target.value;
    setBrand(targetBrand);
  };

  useEffect(() => {
    dispatch(CHANGE_PRICE({ products, price }));
  }, [dispatch, products, price]);

  useEffect(() => {
    dispatch(CHANGE_BRAND({ products, Brand }));
  }, [dispatch, products, Brand]);
  const productclear = () => {
    setBrand("All");
    setCategory("All");
    setPrice(maxPrice);
  };
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allcategories.map((cat, index) => (
          <button
            type="button"
            key={index}
            className={`${Category === cat ? styles.active : null}`}
            onClick={() => changeCategory(cat)}
          >
            {" "}
            &#8250; {cat}
          </button>
        ))}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select name="brand" onChange={changeBrand} value={Brand}>
          {allbrands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <h4>Price</h4>
      <p>{`$${price}`}</p>
      <div className={styles.price}>
        <input
          type="range"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={minPrice}
          max={maxPrice}
        ></input>
      </div>
      <button className="--btn --btn-danger" onClick={productclear}>
        Clear Filter
      </button>
    </div>
  );
};

export default ProductFilter;
