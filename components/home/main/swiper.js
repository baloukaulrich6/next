import styles from './styles.module.scss'

import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function SwiperMain() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mainSwiper"
      >
        {[...Array(10).keys()].map((i, y) =>(
           <SwiperSlide key={y}>
            <img src={`../../../images/swipers/${i+1}.png`} alt=""/>
        </SwiperSlide> 
        ))}
      </Swiper>
    </>
  );
}

