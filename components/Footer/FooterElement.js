import Link from 'next/link'
import { useRouter } from 'next/router'
import classes from './FooterElement.module.css'

const FooterElement = ({ title, links }) => {

  const { locale } = useRouter()

  return (
    <div className={classes.main}> 
      <h5>{title}</h5>
      <div className={classes.links}>
        {
          links.map((link, index) => (
            <Link href={link.to} key={index}>
              <p className={classes.link}>
                {
                  locale == 'fr-FR' ? link.name.fr : locale == 'ar-DZ' ? link.name.ar : link.name.en
                }
              </p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default FooterElement