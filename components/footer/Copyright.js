import styles from "./styles.module.scss";
import Link from 'next/link'
import {IoLocationSharp} from 'react-icons/io5'

export default function Copyright() {
  return (
    <div className={styles.footer__copyright}>
        <section>©2023 BLEASY ALL Rights Reserved.</section>
        <ul>
            {
                data.map((link)=>(
                    <li>
                        <Link href={link.link}>{link.name}</Link>
                    </li>
                ))}
                <li>
                    <a>
                        <IoLocationSharp/>
                        CAMEROON
                    </a>
                </li>
        </ul>
    </div>
  )
}
const data =[
    {
        name: "Privacy Center",
        link:"",
    },
    {
        name: "Privacy & Cookie Policy",
        link:"",
    },
    {
        name: "Manager Cookies",
        link:"",
    },
    {
        name: "Terms & Conditions",
        link:"",
    },
    {
        name: "Copyright Notice",
        link:"",
    },
]
