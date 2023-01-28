import Links from './Link'
import NexsLetter from './NewsLetter'
import Socials from './Socials'
import styles from './styles.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.footer__container}>
            <Links/>
            <Socials/>
            <NexsLetter/>
        </div>
    </footer>
  )
}
