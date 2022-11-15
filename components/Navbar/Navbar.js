import classes from './Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '../../public/assets/logoSmall.webp'

const Navbar = () => {
  return (
    <div className={classes.main}>
      <nav className={classes.menu}>
        
      </nav>

      <div className={classes.logo_container}>
        <Link href={'/'}>
          <Image src={Logo} alt='logo' />
        </Link>
      </div>

      <div className={classes.select_container}>
      </div>
    </div>
  )
}

export default Navbar