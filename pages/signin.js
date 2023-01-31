import Header from "../components/header"
import Footer from "../components/footer"
import styles from "../styles/signin.module.scss"
import {BiLeftArrowAlt} from 'react-icons/bi'
import Link from "next/link"
import { Formik, Form } from "formik"

export default function signin() {
  return (
    <>
       <Header country={{name:"Cameroun", flag:"https://cdn.ipregistry.co/flags/emojitwo/cm.svg"}}/>
          <div className={styles.login}>
            <div className={styles.login__container}>
              <div className={styles.login__header}>
                <div className={styles.back__svg}>
                  <BiLeftArrowAlt/>
                </div>
                <span>
                  We'd be happy to join us <Link href="/">Go Store</Link>
                </span>
              </div>
              <div className={styles.login__form}>
                  <h1>Sign in</h1>
                   <p>Fet access to on of the best Eshopping </p>
                   <Formik>
                    {(form) =>(
                      <Form>
                        <input type='text' />
                      </Form>
                    )}
                   </Formik>
              </div>
            </div>
          </div>
       <Footer country="Cameroun"/>
    </>
   
  )
}
