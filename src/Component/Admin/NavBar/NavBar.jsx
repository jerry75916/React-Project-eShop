import React from "react";
import "./NavBar_Module.scss";
import { FaUserCircle } from "react-icons/fa";
import { selectuserName } from "../../../redux/slice/authSlice";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  const userName = useSelector(selectuserName);
  const activeLink = ({ isActive }) => (isActive ? `activeN` : "");
  return (
    <div>
      <div className="user">
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
