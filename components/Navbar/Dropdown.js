import Link from 'next/link'

import classes from './Dropdown.module.css'

const Dropdown = ({ links }) => {
  return (
    <Link href={'/'}>
      <div className={classes.main}>
        {
          links.map((link, index) => (
            <Link href={link.to} key={index}>
              <button className={classes.link}>{link.name.en}</button>
            </Link>
          ))
        }
      </div>
    </Link>
  )
}

export default Dropdown