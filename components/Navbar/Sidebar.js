import dynamic from 'next/dynamic'

import Image from 'next/image'
import Link from 'next/link'

import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { VscClose } from 'react-icons/vsc'

import classes from './Sidebar.module.css'
import Logo from '../../public/assets/logoSmall.webp'

const NavItems = dynamic(() => import('./NavItems'))

const Sidebar = ({ handleClose }) => {
  return (
    <div className={classes.content}>
      <div className={classes.head}>
        <Link href={'/'}>
          <Image src={Logo} width={150} height={'auto'} alt='Logo' priority />
        </Link>
        <VscClose onClick={handleClose} className={classes.close_icon} />
      </div>
      <div className={classes.main}>
        <NavItems sidebar={true} handleClose={handleClose} />
      </div>
      <div className={classes.icons}>
        <FaFacebook className={classes.icon} />
        <FaInstagram className={classes.icon} />
      </div>
    </div>
  )
}

export default Sidebar