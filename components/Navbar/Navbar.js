import classes from './Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '../../public/assets/logoSmall.webp'

import NavItem from './NavItem'
import Dropdown from './Dropdown'

const shopLinks = [
  {

  }
]

const aboutLinks = [
  {
    name: {
      en: 'Who we are?',
      fr: 'Qui nous sommes?',
      ar: 'من نحن؟'
    },
    to: '/'
  },
  {
    name: {
      en: 'Contact us',
      fr: 'Contactez-nous',
      ar: 'تواصلوا معنا'
    },
    to: '/'
  },
  {
    name: {
      en: 'FAQs',
      fr: 'FAQs',
      ar: 'الأسئلة الشائعة'
    },
    to: '/'
  },
  {
    name: {
      en: 'Terms & conditions',
      fr: 'Termes et conditions',
      ar: 'الشروط والأحكام'
    },
    to: '/'
  }
]

const Navbar = () => {
  return (
    <div className={classes.main}>
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
      </div>
    </div>
  )
}

export default Navbar