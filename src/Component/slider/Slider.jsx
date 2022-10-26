import React, { useState, useEffect } from "react";

import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { sliderData } from "./Slider-data";
import "./Slider.scss";
const Slider = () => {
  const [currentSlider, setcurrentSlider] = useState(0);
  const sliderLength = sliderData.length;

  const autoScroll = true;
  let SliderInterval;
  let InterValTime = 5000;

  const prevSlide = () => {
    if (currentSlider + 1 === sliderLength) {
      setcurrentSlider(0);
    } else {
      setcurrentSlider(currentSlider + 1);
    }
  };
  const nextSlide = () => {
    if (currentSlider - 1 < 0) {
      setcurrentSlider(sliderLength - 1);
    } else {
      setcurrentSlider(currentSlider - 1);
    }
  };

  useEffect(() => {
    if (autoScroll) {
      const autoSlider = () => {
        SliderInterval = setInterval(nextSlide, InterValTime);
      };
      autoSlider();
    }
    return () => clearInterval(SliderInterval); //為了讓點選時不要再重設一個time interval
  }, [currentSlider, SliderInterval, autoScroll]);

  return (
    <div className="slider">
      <AiOutlineLeftCircle className="arrow prev" onClick={prevSlide} />
      <AiOutlineRightCircle className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlider ? `slide current` : `slide`}
          >
            {index === currentSlider && (
              <>
                <img src={image} alt="slide"></img>
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className=" --btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
