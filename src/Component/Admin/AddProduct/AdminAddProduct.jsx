import React, { useState, useRef, useEffect } from "react";
import "./AdminAddProduct_Module.scss";
import Card from "../../card/Card";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  sotreDb,
  storage,
  StorageeRef,
  StorageDeleObj,
} from "../../../pages/firebase/config";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Timestamp, collection, addDoc, doc, setDoc } from "firebase/firestore";
import Loader from "../../loader/Loader";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];
const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const detectForm = (id, f1, f2) => {
  if (id === "ADD") {
    return f1;
  }
  return f2;
};
const AdminAddProducts = () => {
  const { id } = useParams();

  const [UploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const products = useSelector(selectProducts);
  const productEdit = products.find((product) => {
    return product.id === id;
  });
  const detectForm = (id, f1, f2) => {
    if (id === "ADD") {
      return f1;
    } else {
      return f2;
    }
  };
  const [Product, setProduct] = useState(() => {
    return detectForm(id, initialState, productEdit);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...Product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setisLoading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        setisLoading(false);
      },
      (error) => {
        toast.error(error.message);
        setisLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...Product, imageURL: downloadURL });
          setisLoading(false);
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };
  const fileref = useRef();
  const navigate = useNavigate();
  const addProduct = (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      // Add a new document with a generated id.
      const docRef = addDoc(collection(sotreDb, "products"), {
        ...Product,
        price: +Product.price,
        createdAt: Timestamp.now().toDate(),
      });
      toast.success("Product upload successed");
      navigate("/admin/all-products");
    } catch (e) {
      setisLoading(false);
      toast.error(e.message);
    }
  };
  const editProduct = (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      if (Product.imageURL !== productEdit.imageURL) {
        const desertRef = StorageeRef(storage, productEdit.imageURL);
        StorageDeleObj(desertRef);
      }

      setDoc(doc(sotreDb, "products", id), {
        ...Product,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setisLoading(false);
      navigate("/admin/all-products");
      toast.success("Edit successfuly!!");
    } catch (e) {
      setisLoading(false);
      toast.error(e.message);
    }
  };

  return (
    <div className="product">
      {isLoading ? <Loader /> : ``}
      <h1>{detectForm(id, "Add New Product", "Edit Product")}</h1>
      <Card cardClass="card">
        <form onSubmit={detectForm(id, addProduct, editProduct)}>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            required
            placeholder="Product Name"
            name="name"
            value={Product.name}
            onChange={(e) => handleInputChange(e)}
          ></input>
          <div className="progress-flex">
            <label htmlFor="name">Product Image:</label>
            {UploadProgress === 100 ? (
              <div className="progress">
                <div className="progress-bar">Upload Success</div>
              </div>
            ) : (
              ``
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            placeholder="Product Image"
            name="image"
            onChange={(e) => handleImageChange(e)}
            ref={fileref}
          />
          <input
            type="hidden"
            name="imageURL"
            value={Product.imageURL}
            onInput={(e) => handleImageChange(e)}
          />
          <label htmlFor="name">Product Price:</label>
          <input
            type="number"
            required
            placeholder="Product Price"
            name="price"
            value={Product.price}
            onChange={(e) => handleInputChange(e)}
          ></input>
          <label htmlFor="name">Product Category:</label>
          <select
            required
            name="category"
            value={Product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              -- choose product category --
            </option>
            {categories.map((c) => {
              return (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              );
            })}
          </select>
          <label>Product Company/Brand:</label>
          <input
            type="text"
            placeholder="Product brand"
            required
            name="brand"
            value={Product.brand}
            onChange={(e) => handleInputChange(e)}
          />
          <label>Product Description</label>
          <textarea
            name="desc"
            required
            value={Product.desc}
            onChange={(e) => handleInputChange(e)}
            cols="30"
            rows="10"
          ></textarea>
          <button className="--btn --btn-primary">
            {detectForm(id, "Save Product", "Edit Product")}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AdminAddProducts;
