import { Form, Formik } from "formik";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import styles from "../../../styles/forgot.module.scss";
import CircleIconBtn from "../../../components/buttons/circleIconBtn";
import { useState } from "react";
import * as Yup from 'yup'
import LoginInput from "../../../components/inputs/loginInput";
import axios from "axios";
import DotLoaderSpinner from "../../../components/loaders/dotLoader";
import jwt from 'jsonwebtoken'
import { getSession, signIn } from "next-auth/react";
import  Router  from "next/router";
export default function reset({user_id}) {

    const [password, setPassword] = useState("")
    const [conf_password, setConf_password] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState("")
    const passwordValidation = Yup.object({
        password: Yup.string()
        .required(
          "Please enter your new password"
        )
        .min(6, "password must be between 6 and 36 characters")
        .max(36, "Password must be between 36 and characters"),
        conf_password: Yup.string()
        .required("confirm password.")
        .oneOf([Yup.ref("password")], "password must match."),
      });
    const resetHandler = async ()=> {
      try{
        setLoading(true);
        const {data} = await axios.put("/api/auth/reset",{
            user_id,
            password  
        })
        let options = {
            redirect: false,
            email: data.email,
            password: password,
          };
        await signIn ("credentials", options);

        setError("")
        setLoading(false)
        window.location.reload(true) ;
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
                Reset your password ? <Link href="/">Login instead</Link>
                </span>
            </div> 
            <Formik
              enableReinitialize
              initialValues={{
                password,
                conf_password
              }}
              validationSchema={passwordValidation}
              onSubmit={() => {
                resetHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                   <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Confirm Password"
                    onChange={(e)=>setConf_password(e.target.value)}
                  />
                  <CircleIconBtn type="submit" text="Submit" />
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

export async function getServerSideProps(context){
    const {query, req} = context;
    const session = await getSession({req});
    if(session){
        return{
            redirect:{
                destination: "/",
            },
        };
    }
    const token = query.token
    const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET)
    return{
        props:{
            user_id: user_id.id,
        }
    }
}