import { useState } from "react";
import styles from "./styles.module.scss";
import { signOut } from "next-auth/react";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import Link from "next/link";
import slugify from "slugify";
import { useRouter } from "next/router";
export default function Item({ item, visible, index }) {
  const [show, setShow] = useState(visible);
  const router = useRouter();
  return (
    <li>
      {item.heading == "Sign out" ? (
        <b onClick={() => signOut()}>Sign Out</b>
      ) : (
        <b onClick={() => setShow((prev) => !prev)}>
          {item.heading} {show ? <HiMinusSm /> : <HiPlusSm />}{" "}
        </b>
      )}
      {show && (
        <ul>
          {item.links.map((link, i) => (
            <>
              {link.link.startsWith("/profile/orders") ? (
                <li
                  className={
                    (router.query.q?.split("__")[0] || "") ==
                    slugify(link.name, { lower: true })
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                      lower: true,
                    })}__${link.filter}`}
                  >
                    <a>{link.name}</a>
                  </Link>
                </li>
              ) : (
                <li
                  className={
                    (router.query.q?.split("__")[0] || "") ==
                    slugify(link.name, { lower: true })
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                      lower: true,
                    })}`}
                  >
                    <a>{link.name}</a>
                  </Link>
                </li>
              )}
            </>
          ))}
        </ul>
      )}
    </li>
  );
}
