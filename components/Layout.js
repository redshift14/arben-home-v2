import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Loading from './Loading'

import Navbar from './Navbar/Navbar'

// const Navbar = dynamic(() => import('./Navbar/Navbar'), {
//   loading: () => <Loading />
// })

const Footer = dynamic(() => import('./Footer/Footer'), {
  loading: () => <Loading />
})

const Layout = ({ children }) => {

  const { locale } = useRouter()

  return (
    <div dir={ locale == 'ar-DZ' ? 'rtl' : 'ltr' }>
      <header>
        <Navbar/>
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