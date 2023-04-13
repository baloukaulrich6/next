import { useState } from "react";
import styles from "../styles.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import Size from "./Size";

export default function SizesFilter({ sizes }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Sizes
        <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {sizes.map((size, i) => (
            <Size key={i} size={size} />
          ))}
        </div>
      )}
    </div>
  );
}