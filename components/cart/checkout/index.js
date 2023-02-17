import styles from "./styles.module.scss"

export default function Checkout({subtotal,shippingFree,total,selected}) {
  return (
    <div className={`${styles.cart__checkout} ${styles.card}`}>
        <h2>Order Summary</h2>
        <div className={styles.cart__checkout_line}>
            <span>Subtotal</span>
            <span>{subtotal}FCFA</span>
        </div>
        <div className={styles.cart__checkout_line}>
            <span>Shipping</span>
            <span>+{shippingFree}FCFA</span>
        </div>
        <div className={styles.cart__checkout_total}>
            <span>Total</span>
            <span>{total}FCFA</span>
        </div>
        <div className={styles.submit}>
            <button>Continuer</button>
        </div>
    </div>
  )
}
