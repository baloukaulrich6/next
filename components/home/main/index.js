import Offers from './offers'
import styles from './styles.module.scss'
import SwiperMain from './swiper'

export default function Main() {
  return (
    <div className={styles.main}>
        <div className={styles.header}>header</div>
        <div className={styles.menu}>menu</div>
        <SwiperMain/>
        <Offers />
        <div className={styles.user}>user</div>
    </div>
  )
} 
