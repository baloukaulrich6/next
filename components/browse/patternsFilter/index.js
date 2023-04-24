import { useRouter } from "next/router";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

export default function PatternsFilter({
  patternHandler,
  patterns,
}) {
  const [show, setShow] = useState(true);
  const router = useRouter()
  const existedPattern = router.query.pattern || "";
  return (
    <div className={styles.filter}>
      <h3>
        Pattern <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}
        onClick={() =>
          patternHandler(existedPattern ? `${existedPattern}_${patterns}`: patterns )
        }>
          {patterns.map((pattern, i) => {

            return (
              <div className={styles.filter__sizes_size}
              key={i}>
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
