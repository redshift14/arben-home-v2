import Link from 'next/link'
import Image from 'next/image'

import FooterElement from './FooterElement'
import { aboutLinks, helpLinks, socialLinks } from './footerLinks'

import classes from './Footer.module.css'
import Logo from '../../public/assets/logoSmall.webp'

const Footer = () => {
  return (
    <div className={classes.main}>
      <div className={classes.logo_container}>
        <Link href={'/'}>
          <Image src={Logo} alt='logo' />
        </Link>
      </div>
      <div className={classes.links_columns}>
        <FooterElement title={'About Us'} links={aboutLinks} />
        <FooterElement title={'Help'} links={helpLinks} />
        <FooterElement title={'Social'} links={socialLinks} />
      </div>
    </div>
  )
}

export default Footer