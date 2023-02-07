import Header from './Header'
import Menu from './Menu'
import Offers from './offers'
import styles from './styles.module.scss'
import SwiperMain from './swiper'
import User from './User'

export default function Main() {
  return (
    <div className={styles.main}>
        <Header/>
        <Menu />
        <SwiperMain />
        <Offers />
        <User />
    </div>
  )
} 
