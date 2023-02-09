import styles from "./styles.module.scss";

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
        <h3>WE ACCPET</h3>
        <div className={styles.footer__flexwrap}>
          <img src="../../../payment/visa.png" />
          <img src="../../../payment/mastercard.png" />
          <img src="../../../payment/orangeMoney.png" />
        </div>
      </div>
  );
}
