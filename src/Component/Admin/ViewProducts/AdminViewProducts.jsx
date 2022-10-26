import React, { useState, useEffect } from "react";
import "./AdminViewProducts_Module.scss";
import { toast } from "react-toastify";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc
} from "firebase/firestore";
import { storage, sotreDb,StorageeRef,StorageDeleObj } from "../../../pages/firebase/config";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import ConfirmBox from "../../ConfirmBox/ConfirmBox";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";

const AdminViewProducts = () => {

  const [displayConfirm,setDisplayConfirm]=useState(false);
  const [delObj,setdelObj]=useState(null);
  const navigator=useNavigate();

  const {data,isLoading}= useFetchCollection("products");
  const Products=useSelector(selectProducts)
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(STORE_PRODUCTS({
       products:data
     }))
   }, [dispatch,data]);
  const DelProd=(status)=>{
    setDisplayConfirm(false)

    if(status){
      DeleteProductFromConfirm(delObj.id,delObj.imageURL);
    }
  }
  const DeleteProductFromConfirm=async (id,imageURL)=>{
    await deleteDoc(doc(sotreDb, "products", id));
    const desertRef = StorageeRef(storage, imageURL);
    StorageDeleObj(desertRef)
    toast.success('Product is delete successful');
  }
  const delProduct=(id,imageURL)=>{
  try{

    setdelObj({id:id,imageURL:imageURL})
    setDisplayConfirm(true)

  }catch(error){
    toast.error(error.message);
  }
  }
  



  return (
    <>
      {isLoading && <Loader />}
      {displayConfirm?<ConfirmBox imgUrl={delObj.imageURL} deletefun={DelProd}/>:``}
      <div className="table">
        <h2>All Products</h2>
        {Products.length === 0 ? (
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
              {Products.map((product, index) => {
                const {id,imageURL,desc,name,category,price}=product
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
                    <td className="icons">
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color={"green"} />
                      </Link>
                      &nbsp;
                      <FaTrash onClick={()=>delProduct( id,imageURL)}  size={20} color={"red"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminViewProducts;
