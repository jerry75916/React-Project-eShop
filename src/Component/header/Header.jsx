import React, { useState, useEffect } from "react";
import {
  CALCULATE_TOTALQUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { BiMenuAltRight } from "react-icons/bi";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { auth } from "../../pages/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import ShowOnLoggin, { ShowOnLoggOut } from "../HiddenLink/HiddenLink";
import AdminOnlyRoute, {
  AdminOnlyLink,
} from "../AdminOnlyRoute/AdminOnlyRoute";
const Component_logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);
const Cart = ({ cartQuantity }) => {
  return (
    <span className={styles.cart}>
      <Link to="/cart">
        <GiShoppingCart size={25} />
        <p>{cartQuantity}</p>
      </Link>
    </span>
  );
};
const activLink = ({ isActive }) => {
  return isActive ? `${styles.active}` : ``;
};
const Header = () => {
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setIsScroll] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const dispatch = useDispatch();

  const fixNavBar = () => {
    if (window.scrollY > 80) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  window.addEventListener("scroll", fixNavBar);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };
  const LogOutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sign Out Successful!!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        //no display name
        if (!user.displayName) {
          const usname = user.email.substring(0, user.email.indexOf("@")); //取@前的字串
          const CUserName = usname.charAt(0).toUpperCase() + usname.slice(1); //大寫開頭小寫為後的email字串
          setdisplayName(CUserName);
        }
        setdisplayName(user.displayName);

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: uid,
          })
        );
      } else {
        // User is signed out
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);
  useEffect(() => {
    dispatch(CALCULATE_TOTALQUANTITY());
  }, []);
  return (
    <>
      <ToastContainer />
      <header className={scrollPage ? `${styles.fixed}` : ``}>
        <div className={styles.header}>
          {Component_logo}
          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>
            <ul>
              {showMenu ? (
                <li className={`${styles["logo-mobile"]}`}>
                  <Link to="/">{Component_logo}</Link>
                  <FaTimes size={20} onClick={hideMenu} className={styles.x} />
                </li>
              ) : (
                ``
              )}
              <AdminOnlyLink>
                <li>
                  <NavLink to="/admin">
                    <button className="--btn --btn-primary">Admin</button>
                  </NavLink>
                </li>
              </AdminOnlyLink>
              <li>
                <NavLink className={activLink} to="/">
                  Home
                </NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to="/contact" className={activLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className={`${styles["header-right"]}`}>
              <span className={styles.links}>
                <ShowOnLoggOut>
                  <NavLink to="/login" className={activLink}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className={activLink}>
                    Register
                  </NavLink>
                </ShowOnLoggOut>
                <ShowOnLoggin>
                  <a href="#home" style={{ color: "#ff7722" }}>
                    <FaUserCircle className={styles.user} />
                    Hi, {displayName}
                  </a>
                  <NavLink to="/order-history" className={activLink}>
                    My Orders
                  </NavLink>
                  <Link to="/" onClick={LogOutUser}>
                    LogOut
                  </Link>
                </ShowOnLoggin>
              </span>
              <Cart cartQuantity={cartQuantity} />
            </div>
          </nav>
          <div className={`${styles["menu-icon"]}`}>
            <Cart cartQuantity={cartQuantity} />
            <BiMenuAltRight size={30} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
