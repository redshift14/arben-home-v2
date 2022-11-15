import '../style/globals.css'
import Navbar from '../components/Navbar/Navbar'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar />    
      <Component {...pageProps} />
    </>
  )
}

export default MyApp