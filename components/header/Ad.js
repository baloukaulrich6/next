import styles from "./styles.module.scss"
import Link from "next/link";

export default function Ad() {
  return (
  <Link href="/browser">
    <div className={styles.ad}> add </div>
  </Link>
  )
}
