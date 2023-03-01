import { useState, useEffect } from 'react'

import classes from './Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Logo from '../../public/assets/logoSmall.webp'

import NavItem from './NavItem'
import Dropdown from './Dropdown'

import { aboutLinks, shopLinks } from './navLinks'

import LanguageSelect from './LanguageSelect'

const Navbar = () => {

  const { locale } = useRouter()

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset)
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={offset > 65 ? `${classes.main} ${classes.shadow}` : classes.main}>
      <nav className={classes.nav}>
        <NavItem 
          linkName={locale == 'fr-FR' ? 'Accueil' : locale == 'ar-DZ' ? 'الرئيسة' : 'Home' } 
          to={'/'}
        />
        <NavItem 
          linkName={locale == 'fr-FR' ? 'Boutique' : locale == 'ar-DZ' ? 'المتجر' : 'Shop'}
          to={undefined}
          withDropDown={true}
        >
          <Dropdown links={shopLinks} />
        </NavItem> 
        <NavItem 
          linkName={locale == 'fr-FR' ? 'À propos' : locale == 'ar-DZ' ? 'حول' : 'About' }
          to={undefined}
          withDropDown={true}
        >
          <Dropdown links={aboutLinks} />
        </NavItem>
      </nav>

      <div className={locale == 'ar-DZ' ? `${classes.logo_container} ${classes.logo_container_ar}` : classes.logo_container}>
        <Link href={'/'}>
          <Image src={Logo} alt='logo' />
        </Link>
      </div>

      <div className={locale == 'ar-DZ' ? `${classes.select_container} ${classes.select_container_ar}` : classes.select_container}>
        <LanguageSelect />
      </div>
    </div>
  )
}

export default Navbar