import React, { useRef, useState } from "react";
import "./auth_module.scss";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Loader from "../../Component/loader/Loader";
import img_register from "../../assets/register.png";
import Card from "../../Component/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const Name = useRef(null);
  const Email = useRef(null);
  const Password = useRef(null);
  const ConfirmPassword = useRef(null);
  const [isloading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const RegisterUser = (e) => {
    e.preventDefault();
    const loginEmail = Email.current.value;
    const currentPassword = Password.current.value;
    const currentConfirmPassword = ConfirmPassword.current.value;
    const currentDisplayName = Name.current.value;
    if (currentPassword !== currentConfirmPassword) {
      toast.error("Password & Confirm Password do not match!!");
    }
    setisLoading(true);
    createUserWithEmailAndPassword(auth, loginEmail, currentPassword)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: currentDisplayName,
        })
          .then(() => {
            setisLoading(false);
            toast.success("Registration is successful!!");
            navigate("/login");
          })
          .catch((error) => {
            toast.error(error.message);
            setisLoading(false);
          });
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

      <section className="auth container">
        <Card>
          <div className="form">
            <h2>Register</h2>
            <form onSubmit={RegisterUser}>
              <input type="email" placeholder="Email" required ref={Email} />
              <input
                type="text"
                placeholder="Display Name"
                required
                ref={Name}
              />
              <input
                type="password"
                placeholder="Please enter your password"
                required
                ref={Password}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                ref={ConfirmPassword}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>

              <span className="register">
                Already an account?
                <Link to="/Login" style={{ color: "red" }}>
                  Login
                </Link>
              </span>
            </form>
          </div>
        </Card>
        <div className="img">
          <img src={img_register} alt="login" />
        </div>
      </section>
    </>
  );
};

export default Register;
