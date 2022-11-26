import { useState, useEffect } from 'react'

import classes from './Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Logo from '../../public/assets/logoSmall.webp'

import NavItem from './NavItem'
import Dropdown from './Dropdown'

import { aboutLinks } from './navLinks'

import LanguageSelect from './LanguageSelect'

const Navbar = () => {

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset)
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, []);

  return (
    <div className={offset > 180 ? `${classes.main} ${classes.shadow}` : classes.main}>
      <nav className={classes.nav}>
        <NavItem linkName='Home' />
        <NavItem linkName='Shop' withDropDown={true}>
          <Dropdown links={aboutLinks} />
        </NavItem>
        <NavItem linkName='About' withDropDown={true}>
          <Dropdown links={aboutLinks} />
        </NavItem>
      </nav>

      <div className={classes.logo_container}>
        <Link href={'/'}>
          <Image src={Logo} alt='logo' />
        </Link>
      </div>

      <div className={classes.select_container}>
        <LanguageSelect />
      </div>
    </div>
  )
}

export default Navbar