import Empty from "../components/cart/empty";
import Header from "../components/cart/header"
import styles from "../styles/cart.module.scss"
export default function cart({country}) {
    const cart = [];
  return (
    <>
        <Header country={{
          name: "Cameroun",
          flag: "https://cdn.ipregistry.co/flags/emojitwo/cm.svg",
        }}/>
        <div className={styles.cart}>
            {cart.length > 1 ? (
                <div className={styles.cart__container}></div>
            ):(
                <Empty />
            )}
        </div>
    </>
  )
}
