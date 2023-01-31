import Header from "../components/header"
import Footer from "../components/footer"
import styles from "../styles/signin.module.scss"
import {BiLeftArrowAlt} from 'react-icons/bi'
import Link from "next/link"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import LoginInput from "../components/inputs/loginInput/index"
import { useState } from "react"
import {getProviders,signIn} from "next-auth/react"
import CircleIconBtn from "../components/buttons/circleIconBtn/index"

const initialValues = {
  login_email:"",
  login_password:"",
  full_name:"",
  email:"",
  password:"",
  confirm_password:"",
};

export default function signin({providers}) {
  const [user, setUser] = useState(initialValues)
  const {
    login_email, 
    login_password,
    full_name,
    email,
    password,
    confirm_password,} = user
  const handleChange = (e) =>{
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }
  const loginValidation = Yup.object({
    login_email: Yup.string().required("Email address")
    .email("Please entre a valid email address."),
    login_password: Yup.string().required("Password")
  })
  const registerValidation = Yup.object({
    full_name: Yup.string().required("What is your name ?")
    .min(3,"Frist name must be between 3 and 25 characters")
    .max(25,"Frist name must be between 3 and 25 characters")
    .matches(/^[a-zA-Z]/, "Number and spacial characters are not allowed"),
    password: Yup.string().required("Enter a combination of last two numbers sand punctuation characters ")
    .min(6,"password must be between 6 and 36 characters")
    .max(36,"Password must be between 36 and characters"),
    email: Yup.string().required("Email address")
    .email("Please entre a valid email address."),
    confirm_password: Yup.string().required("confirm password.")
    .oneOf([Yup.ref("password")], "password must match.")
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
                         icon="Email"
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
                   <div className ={styles.login__socials}>
                    <span className ={styles.or}> Or continue with</span>
                  <div className={styles.login__socials__wraps}>
                      {providers.map((provider)=>(
                          <div key={provider.name}>
                            <button
                            className={styles.social__btn}
                            onClick={() => signIn(provider.id)}>
                              <img src={`../../icons/${provider.name}.png`}/>
                              Sign in with{provider.name}
                            </button>
                          </div>
                        ))
                      }
                  </div>
                   </div>
              </div>
            </div>

            <div className={styles.login__container}>
              <div className={styles.login__form}>
                  <h1>Sign up</h1>
                   <p>Fet access to on of the best Eshopping </p>
                   <Formik
                   enableReinitialize
                   initialValues={{
                    full_name,
                    email,
                    password,
                    confirm_password,
                   }}
                   validationSchema={registerValidation}
                   >
                    {(form) =>(
                      <Form>
                        <LoginInput
                         type='text'
                         name='full_name'
                         icon="user"
                         placeholder="Full name"
                         onChange={handleChange}/>

                          <LoginInput
                         type='email'
                         name='email'
                         icon="email"
                         placeholder="Email"
                         onChange={handleChange}/>

                          <LoginInput
                         type='password'
                         name='password'
                         icon="password"
                         placeholder="Password"
                         onChange={handleChange}/>

                          <LoginInput
                         type='password'
                         name='confirm_password'
                         icon="password"
                         placeholder="Confirm Password"
                         onChange={handleChange}/>
                        <CircleIconBtn type='submit' text="Sign up"/>
                      </Form>
                    )}
                   </Formik>
              </div>
            </div>
          </div>
       <Footer country="Cameroun"/>
    </>
  );
}

export async function getServerSideProps(context){
  const providers = Object.values(await getProviders())
  return {
    props: {providers}
  }
}