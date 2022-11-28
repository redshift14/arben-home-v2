import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import FooterElement from './FooterElement'
import { aboutLinks, helpLinks, socialLinks } from './footerLinks'

import classes from './Footer.module.css'
import Logo from '../../public/assets/logoSmall.webp'

const Footer = () => {

  const { locale } = useRouter()

  return (
    <div className={classes.main}>
      <div className={classes.logo_container}>
        <Link href={'/'}>
          <Image src={Logo} alt='logo' />
        </Link>
      </div>
      <div className={classes.links_columns}>
        <FooterElement 
          title={locale == 'fr-FR' ? 'À propos' : locale == 'ar-DZ' ? 'حول' : 'About Us'} 
          links={aboutLinks}
        />
        <FooterElement 
          title={locale == 'fr-FR' ? 'Aider' : locale == 'ar-DZ' ? 'مساعدة' : 'Help'} 
          links={helpLinks}
        />
        <FooterElement 
          title={locale == 'fr-FR' ? 'Social' : locale == 'ar-DZ' ? 'وسائل التواصل' : 'Social'}
          links={socialLinks} 
        />
      </div>
    </div>
  )
}

export default Footer