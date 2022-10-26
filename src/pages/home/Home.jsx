import React,{useEffect} from "react";
import "./Home_Module.scss";
import Slider from "../../Component/slider/Slider";
import Product from "../../Component/Product/Product";
const Home = () => {
  const url=window.location.href;
  const scrollProducts=()=>{
   if(url.includes('#products'))
   {
    window.scrollTo({
    top:750,
    behavior:'smooth'
    })}
   return;
  }
  return (
    <div>
      {/* <Slider /> */}
      <Product/>
    </div>
  );
};

export default Home;
