import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
export default function ProductsSwiper({ header , products, bg}) {
  return (
    <div className={styles.wrapper}>
      {header && <div className={styles.header} style={{background:`${bg ? bg : ""}`}}>{header}</div>}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="products-swiper"
      >
        {products.map((product)=>(<SwiperSlide>
            <div className="styles.product">
                <div className={styles.product__img}><img src={product.image}/></div>
                <div className={styles.product__infos}>
                <h1>{product.name.length > 28 ? `${product.name.slice(0,28)}...`: product.name}</h1>
                
                {product.price && <span>{product.price} FCFA</span>}
                </div>

            </div>
        </SwiperSlide>))}
      </Swiper>
    </div>
  );
}
