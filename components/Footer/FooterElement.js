import Link from 'next/link'

import classes from './FooterElement.module.css'

const FooterElement = ({ title, links }) => {
  return (
    <div className={classes.main}> 
      <h5>{title}</h5>
      <div className={classes.links}>
        {
          links.map((link, index) => (
            <Link href={link.to} key={index}>
              <p className={classes.link}>{link.name.en}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default FooterElement