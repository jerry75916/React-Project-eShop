import ReactDOM from "react-dom";
import loaderImg from "../../assets/loader.gif";
import "./Loader_Module.scss";
const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="loading..."></img>
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
