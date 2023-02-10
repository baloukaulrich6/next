import styles from './styles.module.scss'
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    EmailShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
  
  import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";


export default function Share() {
  return (
    <div className={styles.share}>
        <FacebookShareButton />
    </div>
  )
}
