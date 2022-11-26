import Head from 'next/head'

import Cart from './Navbar/Cart'
import Navbar from './Navbar/Navbar'
import Sidebar from './Navbar/Sidebar'
import Bottombar from './Navbar/Bottombar'
import Footer from './Footer/Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Arben Home</title>
      </Head>
      <header>
        <Cart />
        <Sidebar />
        <Navbar />
        <Bottombar />
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