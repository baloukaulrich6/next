import { Form, Formik } from "formik";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "../../styles/forgot.module.scss";
import CircleIconBtn from "../../components/buttons/circleIconBtn";
import React,{ useState } from "react";
import * as Yup from 'yup'
import LoginInput from "../../components/inputs/loginInput";
import axios from "axios";
import DotLoaderSpinner from "../../components/loaders/dotLoader";

export default function forgot() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState("")
    const emailValidation = Yup.object({
        email: Yup.string()
          .required("Email address")
          .email("Please entre a valid email address."),
      });
    const forgotHandler = async ()=> {
      try{
        setLoading(true);
        const {data} = await axios.post("/api/auth/forgot",{
          email,
        })
        setError("")
        setSuccess(data.message)
        setLoading(false)
        setEmail("")
      }catch(e){
        setLoading(false);
        setSuccess("")
        setError(e.response.data.message)
      }
    }
  return (
    <>
     {loading && <DotLoaderSpinner loading={loading} />}
      <Header country="" />
      <div className={styles.forgot}>
        <div>
            <div className={styles.forgot__header}>
                <div className={styles.back__svg}>
                <BiLeftArrowAlt />
                </div>
                <span>
                Forgot You password ? <Link href="/">Login instead</Link>
                </span>
            </div> 
            <Formik
              enableReinitialize
              initialValues={{
                email
              }}
              validationSchema={emailValidation}
              onSubmit={() => {
                forgotHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="email"
                    name="email"
                    icon="email"
                    placeholder="Email address"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <CircleIconBtn type="submit" text="SEND LINK" />
                  <div style={{marginTop:"10px"}}>
                  {error && (<span className={styles.error}>{error}</span>)}
                  {success && (<span className={styles.success}>{success}</span>)}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
      </div>
      <Footer country="" />
    </>
  );
}
