import React, { useRef, useState } from "react";
import "./auth_module.scss";
import img_Login from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoGoogle } from "react-icons/io";
import Card from "../../Component/card/Card";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Component/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";
const Login = () => {
  const prviousURL = useSelector(selectPreviousURL);
  const Email = useRef(null);
  const Password = useRef(null);
  const [isloading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const autoNavigate = () => {
    if (prviousURL.includes("cart")) {
      navigate("/cart");
    } else {
      navigate("/");
    }
  };

  const fun_Login = (e) => {
    e.preventDefault();
    const currentEmail = Email.current.value;
    const currentPassword = Password.current.value;
    setisLoading(true);
    signInWithEmailAndPassword(auth, currentEmail, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setisLoading(false);
        toast.success("login Successful!!");
        autoNavigate();
      })
      .catch((error) => {
        toast.error(error.message);
        setisLoading(false);
      });
  };
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    setisLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setisLoading(false);
        toast.success("Google Login success");
        autoNavigate();
      })
      .catch((error) => {
        toast.error(error.message);
        setisLoading(false);
      });
  };
  return (
    <>
      <ToastContainer />
      {isloading && <Loader />}
      <section>
        <div className="auth container">
          <div className="img">
            <img src={img_Login} alt="login" />
          </div>
          <Card>
            <div className="form">
              <h2>Login</h2>
              <form onSubmit={fun_Login}>
                <input type="email" placeholder="Email" required ref={Email} />
                <input
                  type="password"
                  placeholder="Please enter your password"
                  required
                  ref={Password}
                />
                <button
                  type="submit"
                  className="--btn --btn-primary --btn-block"
                >
                  Login
                </button>
                <div className="links">
                  <Link to="/Reset" style={{ color: "red" }}>
                    Reset Password
                  </Link>
                </div>
                <p> --or--</p>
                <button
                  type="button"
                  className="--btn --btn-danger --btn-block"
                  onClick={loginWithGoogle}
                >
                  <IoLogoGoogle size={20} /> Login with Google
                </button>
                <span className="register">
                  Don't have an account?
                  <Link to="/Register" style={{ color: "red" }}>
                    Register
                  </Link>
                </span>
              </form>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Login;
