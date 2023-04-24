import {getSession} from 'next-auth/react'
import Layout from '../../components/profile/layout';
import Head from 'next/head';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import styles from "../../styles/profile.module.scss"
import React,{ useState } from 'react';
import CircleIconBtn from '../../components/buttons/circleIconBtn';
import LoginInput from '../../components/inputs/loginInput';
import axios from 'axios';

export default function Index({user, tab}) {
  const [current_password, SetCurrent_password] = useState("")
  const [password, SetPassword] = useState("")
  const [confirm_password, SetConfirm_password] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const validate = Yup.object({
    current_password: Yup.string()
    .required(
      "Enter a combination of last two numbers sand punctuation characters "
    )
    .min(6, "password must be between 6 and 36 characters")
    .max(36, "Password must be between 36 and characters"),
    password: Yup.string()
      .required(
        "Enter a combination of last two numbers sand punctuation characters "
      )
      .min(6, "password must be between 6 and 36 characters")
      .max(36, "Password must be between 36 and characters"),
    confirm_password: Yup.string()
      .required("confirm password.")
      .oneOf([Yup.ref("password")], "password must match."),
  });
  const changePasswordHandler = async () =>{
    try{
      const {data} = await axios.put("/api/user/changePassword", {
        current_password,
        password
      })
      setError('')
      setSuccess(data.message)
    }catch(e){
      setSuccess("")
      setError(e.response.data.message)
    }
  }
  return (
    <Layout session={user.user} tab={tab}>
      <Head>
        <title>Profile - Security</title>
      </Head>
      <Formik
              enableReinitialize
              initialValues={{
                current_password,
                password,
                confirm_password
              }}
              validationSchema={validate}
              onSubmit={() => {
                changePasswordHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="password"
                    name="current_password"
                    icon="password"
                    placeholder="Current Password"
                    onChange={(e) => SetCurrent_password(e.target.value)}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="New Password"
                    onChange={(e) => SetPassword(e.target.value)}
                  />
                   <LoginInput
                    type="password"
                    name="confirm_password"
                    icon="password"
                    placeholder="Confirm Password"
                    onChange={(e) => SetConfirm_password(e.target.value)}
                  />
                  <CircleIconBtn type="submit" text="Change Password" />
                  <br/>
                  {error && (
                    <span className={styles.error}>{error}</span>
                  )}
                  {success && (
                    <span className={styles.success}>{success}</span>
                  )}
                </Form>
              )}
      </Formik>
    </Layout>
  )
}
export async function getServerSideProps(ctx){
    const   {query, req} = ctx
    const session = await getSession({req});
    const tab = query.tab || 0;
    return {
      props :{user: session,tab
      }
    }
}