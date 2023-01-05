import { useRouter } from 'next/router'
import Head from 'next/head'

import Cart from './Cart/Cart'
import Navbar from './Navbar/Navbar'
import Sidebar from './Navbar/Sidebar'
import FiltersSidebar from './Products/FiltersSidebar'

import Bottombar from './Navbar/Bottombar'
import Footer from './Footer/Footer'
import CartQuantityLabel from './Cart/CartQuantityLabel'

const Layout = ({ children }) => {

  const { locale } = useRouter()

  return (
    <div dir={ locale == 'ar-DZ' ? 'rtl' : 'ltr' }>
      <Head>
        <title>Arben Home</title>
      </Head>
      <header>
        <Cart />
        <CartQuantityLabel />
        <Sidebar />
        <FiltersSidebar />
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