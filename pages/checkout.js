import { getSession } from "next-auth/react"
import styles from "../styles/checkout.module.scss"
import { Context } from "react-responsive"
import User from "../models/User"
import Cart from "../models/Cart"
import db from "../utils/db"
import Header from "../components/cart/header"


export default function checkout({cart}) {
  return (
    <>
    <Header />
    <div className={styles.checkout}>
        
    </div>
    </>
  )
}
export async function getServerSideProps(Context){
    db.connectDb()
    const session = await getSession(Context)
    const user = await User.findById(session.user.id)
    const cart = await Cart.findOne({user: user._id})
    db.disconnectDb()
    if(!cart){
        return{
            redirect:{
                destination: "/cart",
            },
        }
    }
    return{
        props:{
            cart: JSON.parse(JSON.stringify(cart))       
        }
    }
}
