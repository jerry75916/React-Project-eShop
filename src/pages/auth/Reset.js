import React, { useRef, useState } from "react";
import "./auth_module.scss";
import img_Reset from "../../assets/forgot.png";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Component/loader/Loader";
import Card from "../../Component/card/Card";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Reset = () => {
  const navigate = useNavigate();
  const [isloading, setisLoading] = useState(false);
  const InputEmail = useRef(null);
  const ResetPassword = (e) => {
    e.preventDefault();

    setisLoading(true);
    const currentInputEmail = InputEmail.current.value;
    sendPasswordResetEmail(auth, currentInputEmail)
      .then(() => {
        toast.success("Password reset successful!!");
        setisLoading(false);
        navigate("/");
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
          <div>
            <img src={img_Reset} alt="login" height={300} />
          </div>
          <Card>
            <div className="form">
              <h2>Reset Password</h2>
              <form onSubmit={ResetPassword}>
                <input
                  type="email"
                  placeholder="Key in Email"
                  required
                  ref={InputEmail}
                />
                <button
                  type="submit"
                  className="--btn --btn-primary --btn-block"
                >
                  Reset Password
                </button>
                <span className=" --flex-between --p">
                  <Link to="/Login">-Login</Link>
                  <Link to="/Register">-Register</Link>
                </span>
              </form>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Reset;
