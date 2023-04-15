import { useState } from "react";
import styles from "../styles.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Size({ size , sizeHandler}) {
  const router = useRouter()
  const existedSize = router.query.size || "";
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter__sizes_size}
    onClick={() =>
      sizeHandler(existedSize ? `${existedSize}_${size}`: size )
    }
    >
      <input type="checkbox" name="size" id={size} />
      <label htmlFor={size}>{size}</label>
    </div>
  );
}
