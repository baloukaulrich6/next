import Header from "../components/header"
import Footer from "../components/footer"
import styles from "../styles/signin.module.scss"
import {BiLeftArrowAlt} from 'react-icons/bi'
import Link from "next/link"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import LoginInput from "../components/inputs/loginInput/index"
import { useState } from "react"
import CircleIconBtn from "../components/buttons/circleIconBtn/index"

const initialValues = {
  login_email:"",
  login_password:"",
}

export default function signin() {
  const [user, setUser] = useState(initialValues)
  const {login_email, login_password} = user
  const handleChange = (e) =>{
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }
  console.log(user);
  const loginValidation = Yup.object({
    login_email: Yup.string().required("Email address")
    .email("Please entre a valid email address."),
    login_password: Yup.string().required("Password")
  })
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
                   <Formik
                   enableReinitialize
                   initialValues={{
                    login_email,
                    login_password,
                   }}
                   validationSchema={loginValidation}
                   >
                    {(form) =>(
                      <Form>
                        <LoginInput
                         type='email'
                         name='login_email'
                         icon="email"
                         placeholder="Email address"
                         onChange={handleChange}/>

                          <LoginInput
                         type='password'
                         name='login_password'
                         icon="password"
                         placeholder="password"
                         onChange={handleChange}/>
                        <CircleIconBtn type='submit' text="Sign in"/>
                        <div className={styles.forgot}>
                          <Link href="/forget">Forgot password ?</Link>
                        </div>
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
