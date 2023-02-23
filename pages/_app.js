import { Toaster } from 'react-hot-toast'
import '../style/globals.css'
import Layout from '../components/Layout'
import { StateContext } from '../context/stateContext'

const MyApp = ({ Component, pageProps }) => {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp