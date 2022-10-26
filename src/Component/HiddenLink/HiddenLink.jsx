import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedin } from "../../redux/slice/authSlice";

const ShowOnLoggin = ({ children }) => {
  const isLogginedIn = useSelector(selectIsLoggedin);
  if (isLogginedIn) {
    return children;
  } else {
    return null;
  }
};

export const ShowOnLoggOut = ({ children }) => {
  const isLogginedOut = useSelector(selectIsLoggedin);
  if (!isLogginedOut) {
    return children;
  } else {
    return null;
  }
};

export default ShowOnLoggin;
