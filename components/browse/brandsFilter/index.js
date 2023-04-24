import { useState } from "react";
import styles from "../styles.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";


export default function Brands({ brands, brandHandler }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Brands
        <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {brands.map((brand, i) => (
           <button 
              className={styles.filter__brand}
              onClick={() => brandHandler(brand)}
              key={i}
           >
              <img src={`../../../images/brands/${brand}.png`}/>
           </button>
          ))}
        </div>
      )}
    </div>
  );
}
