import Layout from '../components/Layout'
import Head from 'next/head'
import { StateContext } from '../context/stateContext'
import { Analytics } from '@vercel/analytics/react'

import '../style/globals.css'

const MyApp = ({ Component, pageProps }) => {

  return (
    <>
      <StateContext>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta httpEquiv="Content-Language" content='en, ar, fr' />
        <meta charSet="UTF-8" />
      </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
      <Analytics />
    </>
  )
}

export default MyApp