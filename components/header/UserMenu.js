import Link from "next/link"
import styles from "./styles.module.scss"
export default function UserMenu(loggedIn) {
  return (
    <div className={styles.menu}>
        <h4>Welcome to Bleasy!</h4>
        {loggedIn ? (
            <div className={styles.flex}>
                <img 
                  src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" 
                  alt=""
                  className={styles.menu__img}
                  />
                  <div className={styles.col}>
                    <span>Welcome Back,</span>
                    <h3>Luc</h3>
                    <span>Sing out</span>
                  </div>
            </div>

        ):(
           <div className={styles.flex}>
            <button className={styles.btn_primary}>Register</button>
            <button className={styles.btn_outlined}>Login</button>
           </div>
        )}
        <ul>
            <li>
                <Link href="/profile">Account</Link>
            </li> 
            <li>
                <Link href="/profile/orders">My Orders</Link>
            </li> 
            <li>
                <Link href="/profile/messages">Message center</Link>
            </li> 
            <li>
                <Link href="/profile/address">Address</Link>
            </li> 
            <li>
                <Link href="/profile/whishlist">Whishlist</Link>
            </li> 
        </ul>
    </div>
  )
}
