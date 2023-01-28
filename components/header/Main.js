import styles from "./styles.module.scss"
import Link from "next/link"
import { BsCart3 } from "react-icons/bs"
import { RiSearch2Line } from "react-icons/ri"
import { useSelector } from "react-redux"


export default function Main() {
    const {cart} = useSelector((state)=>({...state}))
  return (
    <div className={styles.main}>
        <div className={styles.main__container}>
            <Link legacyBehavior href="/">
                <a className={styles.logo}>
                    <img src="../../../bleasy image 2.png" alt=""/>
                </a>
            </Link>
            <div className={styles.search}>
                <input type="text" placeholder="Search..."/>
                <div className={styles.search__icon}>
                    <RiSearch2Line/>
                </div>
            </div>
            <Link legacyBehavior href="/cart">
                <a className={styles.cart}>
                    <BsCart3/>
                    <span>{cart.length}</span>
                </a>
            </Link>
        </div>
    </div>
  )
}
