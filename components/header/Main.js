import Link from "next/link";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";

 
export default function Main({searchHandler}) {
    const router = useRouter()
    const [query, setQuery] = useState(router.query.search || "")
    const {cart} = useSelector((state)=>({...state}))
    const handlerSearch = (e) => {
        e.preventDefault()
            if(router.pathname !== '/browse'){
                if(query.length > 1){
                    router.push(`/browse?search=${query}`) 
                }
               
            }else{
                searchHandler(query)
            }   
        
    }
  return (
    <div className={styles.main}>
        <div className={styles.main__container}>
            <Link legacyBehavior href="/">
                <a className={styles.logo}>
                    <img src="../../../bleasy image 2.png" alt=""/>
                </a>
            </Link>
            <form onSubmit={(e)=> handlerSearch(e)} className={styles.search}>
                <input 
                   type="text" 
                   placeholder="Search..."
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className={styles.search__icon}>
                    <RiSearch2Line/>
                </button>
            </form>
            <Link legacyBehavior href="/cart">
                <a className={styles.cart}>
                    <FaOpencart />
                    <span>{cart.length}</span>
                </a>
            </Link>
        </div>
    </div>
  )
}
