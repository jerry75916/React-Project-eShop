import React from "react";
import { useState } from "react";
import styles from "./Pagination.module.scss";
const Pagination = ({
  productsPerPage,
  currentPage,
  totalProducts,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setminpageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (number) => {
    setCurrentPage(number);
  };

  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(Math.ceil(totalPages));
      setminpageNumberLimit(minpageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage - 1 === pageNumberLimit) {
      setmaxPageNumberLimit(pageNumberLimit);
      setminpageNumberLimit(0);
    }
  };

  return (
    <ul className={styles.pagination}>
      {currentPage !== 1 && <li onClick={() => paginatePrev()}>Prev</li>}
      {pageNumbers.map((p) => {
        if (p > minpageNumberLimit && p < maxPageNumberLimit + 1) {
          return (
            <li
              key={p}
              onClick={() => paginate(p)}
              className={currentPage === p ? `${styles.active}` : null}
            >
              {p}
            </li>
          );
        }
      })}
      {currentPage !== Math.ceil(totalPages) && (
        <li onClick={() => paginateNext()}>Next</li>
      )}
      <p>
        <b className={styles.page}>{`Page${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
