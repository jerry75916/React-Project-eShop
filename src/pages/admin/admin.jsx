import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../Component/Admin/NavBar/NavBar";
import "./admin_module.scss";
const Admin = () => {
  return (
    <div className="admin">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="Admincontent">{<Outlet />}</div>
    </div>
  );
};

export default Admin;
