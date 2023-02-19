import styles from './styles.module.scss'

export default function PaymentMethods() {
  return (
    <div className={`${styles.card} ${styles.cart__method}`}>
        <h2 className={styles.header}>Payment Methods</h2>
        <div className={styles.images}>
            <img src="../../../payment/mastercard.png" alt=""/>
            <img src="../../../payment/visa.png" alt=""/>
            <img src="../../../payment/orangeMoney.png" alt=""/>
        </div>
        <h2 className={styles.header}>Buyer Protection</h2>
        <div className={styles.protection}>
           <img src="../../../images/protection.png"/>
           Get full refund if the item is not as described or if it's not delievered. 
        </div>
        
    </div>
  )
}
