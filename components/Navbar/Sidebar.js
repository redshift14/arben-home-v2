import { slide as Menu } from 'react-burger-menu'
import { BiMenu } from 'react-icons/bi'
import { VscClose } from 'react-icons/vsc'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import NavItem from './NavItem'
import Dropdown from './Dropdown'
import Logo from '../../public/assets/logoSmall.webp'
import { aboutLinks } from './navLinks'
import classes from './Sidebar.module.css'

export default () => {

  const { locale } = useRouter()

  return (
    <Menu
      className={classes.menu}
      customBurgerIcon={<BiMenu />}
      burgerButtonClassName={classes.burger_icon} 
      customCrossIcon={<VscClose />}
      crossButtonClassName={classes.close_icon}
      morphShapeClassName={classes.morph_shape}
      overlayClassName={classes.overlay}
      right={locale == 'ar-DZ' ? true : false}
    >
      <div className={classes.content}>
        <div className={classes.head}>
          <Link href={'/'}>
            <Image src={Logo} width={150} height={'auto'} alt='Logo' />
          </Link>
        </div>
        <div className={classes.main}>
          <NavItem 
            sidebar={true} 
            linkName={locale == 'fr-FR' ? 'Accueil' : locale == 'ar-DZ' ? 'الرئيسة' : 'Home' } 
          />
          <NavItem 
            sidebar={true} 
            withDropDown={true} 
            linkName={locale == 'fr-FR' ? 'Boutique' : locale == 'ar-DZ' ? 'المتجر' : 'Shop' }
          >
            <Dropdown links={aboutLinks} sidebar={true} />
          </NavItem>
          <NavItem 
            sidebar={true} 
            withDropDown={true} 
            linkName={locale == 'fr-FR' ? 'A propos' : locale == 'ar-DZ' ? 'حول' : 'About'}
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
