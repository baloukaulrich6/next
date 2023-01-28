import '@/styles/globals.scss'
import Head from 'next/head'
import { Provider } from 'react-redux'
import  store from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

function MyApp({ Component, pageProps }) {
  return (
  <>
   <Head>
      <title>Bleasy</title>
      <meta 
        name="description" 
        content="Bleasy-online shopping service initial-scale"/>
      <link rel= 'icon' href='/favicon.ico'/>
   </Head>
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </>
   
)
}
export default MyApp