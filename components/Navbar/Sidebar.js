import { slide as Menu } from 'react-burger-menu'
import { BiMenu } from 'react-icons/bi'
import { VscClose } from 'react-icons/vsc'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import NavItem from './NavItem'
import Dropdown from './Dropdown'
import Logo from '../../public/assets/logoSmall.webp'
import { aboutLinks, shopLinks } from './navLinks'
import classes from './Sidebar.module.css'

const Sidebar = () => {

  const { locale } = useRouter()

  const [open, setOpen] = useState(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <Menu
      className={!open ? `${classes.menu} ${classes.menu_hidden}` : classes.menu}
      customBurgerIcon={<BiMenu />}
      burgerButtonClassName={locale == 'ar-DZ' ? `${classes.burger_icon} ${classes.burger_icon_ar}` : classes.burger_icon} 
      customCrossIcon={<VscClose />}
      crossButtonClassName={locale == 'ar-DZ' ? `${classes.close_icon_ar}` : classes.close_icon}
      morphShapeClassName={classes.morph_shape}
      overlayClassName={classes.overlay}
      right={locale == 'ar-DZ' ? true : false}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOpen={open}
    >
      <div className={classes.content}>
        <div className={classes.head}>
          <Link href={'/'} onClick={handleLinkClick}>
            <Image src={Logo} width={150} height={'auto'} alt='Logo' />
          </Link>
        </div>
        <div className={classes.main}>
          <NavItem 
            sidebar={true} 
            linkName={locale == 'fr-FR' ? 'Accueil' : locale == 'ar-DZ' ? 'الرئيسة' : 'Home' } 
            to={'/'}
            clickFunction={handleLinkClick}
          />
          <NavItem 
            sidebar={true} 
            withDropDown={true} 
            linkName={locale == 'fr-FR' ? 'Boutique' : locale == 'ar-DZ' ? 'المتجر' : 'Shop' }
            to={'/'}
            clickFunction={handleLinkClick}
          >
            <Dropdown links={shopLinks} sidebar={true} />
          </NavItem>
          <NavItem 
            sidebar={true} 
            withDropDown={true} 
            linkName={locale == 'fr-FR' ? 'A propos' : locale == 'ar-DZ' ? 'حول' : 'About'}
            to={'/'}
            clickFunction={handleLinkClick}
          >
            <Dropdown links={aboutLinks} sidebar={true} />
          </NavItem>
        </div>
        <div className={classes.icons}>
          <FaFacebook className={classes.icon} />
          <FaInstagram className={classes.icon} />
        </div>
      </div>
    </Menu>
  )
}

export default Sidebar