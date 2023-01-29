import styles from "./styles.module.scss";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import {FaFacebookF} from "react-icons/fa"


export default function Socials() {
  return (
    <div className={styles.footer__socials}>
        <section>
            <h3>STAY CONNECTED </h3>
            <ul>
                <li>
                    <a href="" target="_blank">
                        <FaFacebookF/> 
                    </a>
                </li>
                <li>
                    <a href="" target="_blank"> 
                     <BsInstagram/>
                    </a>
                </li>
                <li>
                    <a href="" target="_blank">
                        <BsTwitter/> 
                    </a>
                </li>
            </ul>
        </section>
    </div>
  )
}
