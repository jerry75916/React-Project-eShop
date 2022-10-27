import React, { useState, useEffect } from "react";
import styles from "./AdminViewProducts.module.scss";
import { toast } from "react-toastify";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  storage,
  sotreDb,
  StorageeRef,
  StorageDeleObj,
} from "../../../pages/firebase/config";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import ConfirmBox from "../../ConfirmBox/ConfirmBox";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
import Search from "../../Search/Search";
import {
  FILTER_BY_SEARCH,
  selectFilterProductis,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagation/Pagination";
const AdminViewProducts = () => {
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [delObj, setdelObj] = useState(null);
  const navigator = useNavigate();
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products");

  const Products = useSelector(selectProducts);
  const filterProducts = useSelector(selectFilterProductis);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setproductsPerPage] = useState(4);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    dispatch(FILTER_BY_SEARCH({ products: data, search }));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products: Products, search }));
    setCurrentPage(1);
  }, [dispatch, search, Products]);

  const DelProd = (status) => {
    setDisplayConfirm(false);

    if (status) {
      DeleteProductFromConfirm(delObj.id, delObj.imageURL);
    }
  };
  const DeleteProductFromConfirm = async (id, imageURL) => {
    await deleteDoc(doc(sotreDb, "products", id));
    const desertRef = StorageeRef(storage, imageURL);
    StorageDeleObj(desertRef);
    toast.success("Product is delete successful");
  };
  const delProduct = (id, imageURL) => {
    try {
      setdelObj({ id: id, imageURL: imageURL });
      setDisplayConfirm(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {displayConfirm ? (
        <ConfirmBox imgUrl={delObj.imageURL} deletefun={DelProd} />
      ) : (
        ``
      )}
      <div className={styles.table}>
        <h2>All Products</h2>
        <div className={styles.search}>
          <p>
            <b>{filterProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filterProducts.length === 0 ? (
          <p>No product found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, imageURL, desc, name, category, price } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{id}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={desc}
                        style={{ width: "100px", height: "100px" }}
                      ></img>
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{price}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color={"green"} />
                      </Link>
                      &nbsp;
                      <FaTrash
                        onClick={() => delProduct(id, imageURL)}
                        size={20}
                        color={"red"}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          totalProducts={filterProducts.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default AdminViewProducts;
