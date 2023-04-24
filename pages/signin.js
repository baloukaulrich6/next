import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../components/inputs/loginInput/index";
import React,{ useState } from "react";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import CircleIconBtn from "../components/buttons/circleIconBtn/index";
import axios from "axios";
import DotLoaderSpinner from "../components/loaders/dotLoader/index";
import Router from "next/router";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  success: "",
  error: "",
  login_error: "",
};

export default function Signin({country, providers, callbackUrl, csrfToken }) {
  const [user, setUser] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    confirm_password,
    success,
    login_error,
    error,
  } = user;
  const handleChange = (error) => {
    const { name, value } = error.target;
    setUser({ ...user, [name]: value });
  };
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address")
      .email("Please entre a valid email address."),
    login_password: Yup.string().required("Password"),
  });
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What is your name ?")
      .min(3, "Frist name must be between 3 and 25 characters")
      .max(25, "Frist name must be between 3 and 25 characters")
      .matches(/^[a-zA-Z]/, "Number and spacial characters are not allowed"),
    password: Yup.string()
      .required(
        "Enter a combination of last two numbers sand punctuation characters "
      )
      .min(6, "password must be between 6 and 36 characters")
      .max(36, "Password must be between 36 and characters"),
    email: Yup.string()
      .required("Email address")
      .email("Please entre a valid email address."),
    confirm_password: Yup.string()
      .required("confirm password.")
      .oneOf([Yup.ref("password")], "password must match."),
  });
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: " ", error: error.response.data.message });
    }
  };
  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header
        country={{
          name: "Cameroun",
          flag: "https://cdn.ipregistry.co/flags/emojitwo/cm.svg",
        }}
      />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We&rsquo;d be happy to join us <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>Get access to on of the best Eshopping </p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input type="hidden"
                  name="csrfToken"
                  defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="email"
                    name="login_email"
                    icon="email"
                    placeholder="Email address"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="password"
                    onChange={handleChange}
                  />
                  <CircleIconBtn type="submit" text="Sign in" />
                  {login_error && (
                    <span className={styles.error}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forgot password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}> Or continue with</span>
              <div className={styles.login__socials__wraps}>
                {providers.map((provider) => {
                  if (provider.name == "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} />
                        Sign in with{provider.name}
                      </button>
                    </div>
                  );
                })}
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
                name,
                email,
                password,
                confirm_password,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                signUpHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full name"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="email"
                    name="email"
                    icon="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="confirm_password"
                    icon="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                  <CircleIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
          </div>
        </div>
      </div>
      <Footer country="Cameroun" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const { callbackUrl } = query;

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: { providers },
  };
}
