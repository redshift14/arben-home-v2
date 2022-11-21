import Link from 'next/link'
import classes from './Dropdown.module.css'

const Dropdown = ({ links }) => {
  return (
    <div className={classes.main}>
      {
        links.map((link, index) => (
          <Link href={'/'} key={index} className={classes.link_container}>
            <button className={classes.link}>{link.name.en}</button>
          </Link>
        ))
      }
    </div>
  )
}

export default Dropdown