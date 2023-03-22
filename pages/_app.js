import '../styles/globals.scss'
import Head from 'next/head'
import { Provider } from 'react-redux'
import  store from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { SessionProvider } from "next-auth/react"
let persistor = persistStore(store)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
  <>
   <Head>
      <title>Bleasy</title>
      <meta 
        name="description" 
        content="Bleasy-online shopping service initial-scale"/>
      <link rel= 'icon' href='/favicon.png'/>
   </Head>
   <SessionProvider session={session}>
     <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
   </SessionProvider>
  </>
   
)
}
export default MyApp