import Layout from '../components/Layout'
import { StateContext } from '../context/stateContext'
import { Analytics } from '@vercel/analytics/react';

import '../style/globals.css'

const MyApp = ({ Component, pageProps }) => {

  return (
    <>
      <StateContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
      <Analytics />
    </>
  )
}

export default MyApp