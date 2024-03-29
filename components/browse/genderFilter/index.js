import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

export default function GenderFilter({ ganderHandler, replaceQuery }) {
  const genders = ["Men", "Women", "Unisex"];
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Gender <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {genders.map((gender, i) => {
            return (
              <label
              key={i}
                htmlFor={gender}
                className={styles.filter__sizes_size}
                onClick={() => ganderHandler(gender)}
              >
                <input
                  type="checkbox"
                  name="gender"
                  id={gender}
                />
                <label htmlFor={gender}>{gender}</label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
