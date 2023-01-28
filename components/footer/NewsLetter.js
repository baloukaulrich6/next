import styles from "./styles.module.scss";
import Link from 'next/link'

export default function NexsLetter() {
  return (
    <div className={styles.footer__newsletter}>
      <h3>SIGN UP FOR OUR NEW LETTER</h3>
      <div className={styles.footer__flex}>
        <input type="text" placeholder="You Email Address"/>
         <button className={styles.btn_primary}>SUBSCRIBE</button>
      </div>
      <p> 
        By clicking the SUBSCRIBE button, you are agreeing to {""}
        <Link href= ""> our Privacy & Cookie Policy</Link>
      </p>
    </div>
  )
}
