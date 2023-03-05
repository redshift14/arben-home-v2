import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const FooterElement = dynamic(() => import('./FooterElement'))

import { aboutLinks, helpLinks, socialLinks } from '../../lib/data/footerLinks'

import classes from './Footer.module.css'
import Logo from '../../public/assets/logoSmall.webp'

const Footer = () => {

  const { locale } = useRouter()

  return (
    <div className={classes.main}>
      <div className={classes.logo_container}>
        <Link href={'/'}>
          <Image src={Logo} alt='logo' priority />
        </Link>
      </div>
      <div className={classes.links_columns}>
        <FooterElement 
          title={locale == 'fr-FR' ? 'À propos' : locale == 'ar-DZ' ? 'حول' : 'About Us'} 
          links={aboutLinks}
          locale={locale}
        />
        <FooterElement 
          title={locale == 'fr-FR' ? 'Aider' : locale == 'ar-DZ' ? 'مساعدة' : 'Help'} 
          links={helpLinks}
          locale={locale}
        />
        <FooterElement 
          title={locale == 'fr-FR' ? 'Social' : locale == 'ar-DZ' ? 'وسائل التواصل' : 'Social'}
          links={socialLinks}
          locale={locale}
        />
      </div>
    </div>
  )
}

export default Footer