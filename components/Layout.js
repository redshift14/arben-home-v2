import Head from 'next/head'
import Navbar from './Navbar/Navbar'
import Sidebar from './Navbar/Sidebar'

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Arben Home</title>
      </Head>
      <header>
        <Sidebar  />
        <Navbar />
      </header>
      <main>
        { children }
      </main>
      <footer>
        Footer
      </footer>
    </div>
  )
}

export default Layout