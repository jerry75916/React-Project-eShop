import React, { useState, useEffect } from "react";

import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../Search/Search";
import ProductItem from "../ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilterProductis,
  SORT_PRODUCT,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagation/Pagination";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const dispatch = useDispatch();

  const FilterselectProduct = useSelector(selectFilterProductis);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setproductsPerPage] = useState(3);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = FilterselectProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [search, dispatch, products]);

  useEffect(() => {
    dispatch(SORT_PRODUCT({ products, sort }));
  }, [sort, dispatch, products]);

  return (
    <div className={styles.product_list} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color={"orangered"}
            onClick={() => setGrid(true)}
          />
          <FaListAlt
            size={24}
            color={"#0066d4"}
            onClick={() => setGrid(false)}
          />
          <p>
            <b>{FilterselectProduct.length}</b> products found
          </p>
        </div>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {FilterselectProduct.length === 0 ? (
          <p>No product found</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                //{...product}
                <div key={product.id}>
                  <ProductItem grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        totalProducts={FilterselectProduct.length}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;
