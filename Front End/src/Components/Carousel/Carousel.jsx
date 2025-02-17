import React from "react";
import { Carousel } from "react-responsive-carousel";
import img from "../Carousel/img/imgData";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "../Carousel/Carousel.module.css";

function CarouselEffect() {
  return (
    <div >
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((ImgItemLink, index) => {
          return <img key={index} src={ImgItemLink} />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
