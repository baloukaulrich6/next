import { useRouter } from "next/router";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

export default function PatternsFilter({
  patterns,
}) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Pattern <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {patterns.map((pattern, i) => {

            return (
              <div className={styles.filter__sizes_size}>
                <input
                  type="checkbox"
                  name="pattern"
                  id={pattern}
                />
                <label htmlFor={pattern}>
                  {pattern.length > 10
                    ? `${pattern.substring(0, 10)}...`
                    : pattern}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
