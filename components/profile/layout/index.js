import Head from "next/head"
import styles from "./styles.module.scss"
import Header from "../../header/index"
import Sidebar from "../sidebar"
export default function Layout ({session, tab, children }){
    console.log(session);
    return (
        <div className={styles.layout}>
            <Head>
                <title>{session?.user?.name}</title>
            </Head>
            <Header country/>
            <div className={styles.layout__container}>
                <Sidebar 
                    data ={{
                        ...session,
                        tab
                    }}
                />
                
                <div className={styles.layout__content}>
                    {children}
                </div>
            </div>

        </div>
    )
 }