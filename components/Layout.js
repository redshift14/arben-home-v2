import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import Head from 'next/head'

const Navbar = dynamic(() => import('./Navbar/Navbar'))
const Footer = dynamic(() => import('./Footer/Footer'))

const Layout = ({ children }) => {

  const { locale } = useRouter()

  return (
    <div dir={ locale == 'ar-DZ' ? 'rtl' : 'ltr' }>
      <Head>
        <title>Arben Home</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        { children }
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout