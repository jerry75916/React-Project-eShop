import React from "react";
import "./Footer_Module.scss";
const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className="footer">
      &copy;<p>{year}</p>All Right Reserved
    </div>
  );
};

export default Footer;
