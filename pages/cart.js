import Product from "../components/cart/product";
import {useSelector} from "react-redux"
import Empty from "../components/cart/empty";
import Header from "../components/cart/header"
import styles from "../styles/cart.module.scss"
export default function cart() {
    const EMPTY_CART = { cartItems: [] };
    const cart = useSelector(state => state.cart  || EMPTY_CART);
  return (
    <>
        <Header country={{
          name: "Cameroun",
          flag: "https://cdn.ipregistry.co/flags/emojitwo/cm.svg",
        }}/>
        <div className={styles.cart}>
            {cart.cartItems.length > 0 ? (
                <div className={styles.cart__container}>
                  {
                  cart.cartItems.map((product)=>(
                    <Product product={product} key={product._uid} />
                  ))
                  }
                </div>
            ):(
                <Empty />
            )}
        </div>
    </>
  )
}
