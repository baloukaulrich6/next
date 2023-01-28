import styles from "./styles.module.scss";
import Link from "next/link";

export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => (
        <ul>
          {
            i === 0 ?(
              <img src="../../../bleasy image 2.png" alt=""/>
            ):(
              <b>{link.heading}</b>
            )
          }
          {link.links.map((link) => (
            <li>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
const links = [
  {
    heading: "BLEASY",
    links: [
      {
        name: "About US",
        link: "",
      },
      {
        name: "Contact US",
        link: "",
      },
      {
        name: "Social Responsibility",
        link: "",
      },
      {
        name: "",
        link: "",
      },
    ],
  },
  {
    heading: "HELP & SUPPORT",
    links: [
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Returns",
        link: "",
      },
      {
        name: "How To Order",
        link: "",
      },
      {
        name: "How To Track",
        link: "",
      },
      {
        name: "Size Guide",
        link: "",
      },
    ],
  },
  {
    heading: "Customer service",
    links: [
      {
        name: "Customer service",
        link: "",
      },
      {
        name: "Term and Conditions",
        link: "",
      },
      {
        name: "Customer (Transaction)",
        link: "",
      },
      {
        name: "Take our feedback survey",
        link: "",
      },
    ],
  },
];
