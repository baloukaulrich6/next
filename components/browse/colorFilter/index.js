import { useState } from "react";
import styles from "../styles.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useRouter } from "next/router";
 

export default function ColoFilter({ colors , colorHandler}) {
  const router = useRouter()
  const existedColor = router.query.color || "";
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Colors
        <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__colors}>
          {colors.map((color, i) => (
            <button style={{background: `${color}`}} 
            key={i}
            onClick={() =>
              colorHandler(existedColor ? `${existedColor}_${color}`: color )
            }></button>
          ))}
        </div>
      )}
    </div>
  );
}
