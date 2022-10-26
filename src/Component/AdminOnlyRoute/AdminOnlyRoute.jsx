import React from "react";
import { useSelector } from "react-redux";
import { selectemail } from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";
const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectemail);
  if (userEmail === "jerry75916@gmail.com") {
    return children;
  } else {
    return (
      <section style={{ height: "80vh" }}>
        <div className="container">
          <h2>Permisson Deny</h2>
          <p>This page can only be view by an Admin user</p>
          <br />
          <Link to="/">
            <button className=" --btn">&larr; Back To Home</button>
          </Link>
        </div>
      </section>
    );
  }
};

//是否管理員時，出現button
export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectemail);
  if (userEmail === "jerry75916@gmail.com") {
    return children;
  } else {
    return null;
  }
};

export default AdminOnlyRoute;
