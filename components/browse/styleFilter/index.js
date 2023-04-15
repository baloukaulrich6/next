import { useState } from "react";
import styles from "../styles.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useRouter } from "next/router";


export default function StyleFilter({ data, styleHandler }) {
  const router = useRouter()
  const existedStyle = router.query.style || "";
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
    <h3>
      Styles <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
    </h3>
    {show && (
      <div className={styles.filter__sizes}>
        {data.map((style, i) => {
          return (
            <div
              className={styles.filter__sizes_size}
              onClick={() =>styleHandler(style)}
              >  
              <input
                type="checkbox"
                name="style"
                id={style}
                
              />
              <label htmlFor={style}>{style}</label>
            </div>
          );
        })}
      </div>
    )}
  </div>
  );
}
