import Link from "next/link"
import styles from "./styles.module.scss"
import { signOut, signIn } from "next-auth/react"
export default function UserMenu({session}) {
  return (
    <div className={styles.menu}>
        <h4>Welcome to Bleasy!</h4>
        {session ? (
            <div className={styles.flex}>
                <img 
                  src={session.user.image}
                  className={styles.menu__img}
                  />
                  <div className={styles.col}>
                    <span>Welcome Back,</span>
                    <h3>{session.user.name}</h3>
                    <span onClick={() => signOut()}>Sing out</span>
                  </div>
            </div>

        ):(
           <div className={styles.flex}>
            <button className={styles.btn_primary}>Register</button>
            <button className={styles.btn_outlined} onClick={()=>signIn()}>Login</button>
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
