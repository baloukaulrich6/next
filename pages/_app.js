import '../styles/globals.scss'
import Head from 'next/head'
import { Provider } from 'react-redux'
import  store from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { SessionProvider } from "next-auth/react"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
let persistor = persistStore(store)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
  <>
   <Head>
      <title>Bleasy</title>
      <meta 
        name="description" 
        content="Bleasy-online shopping service initial-scale"/>
      <link rel= 'icon' href="https://res.cloudinary.com/duot0gqlu/image/upload/v1689265892/favicon_rmjbrv.png"/>
   </Head>
   <SessionProvider session={session}>
     <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
            {/* Same as */}
        <ToastContainer />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
   </SessionProvider>
  </>
   
)
}
export default MyApp