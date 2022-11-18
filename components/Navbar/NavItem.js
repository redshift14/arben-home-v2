import Link from 'next/link'

import { VscChevronDown } from 'react-icons/vsc'
import classes from './NavItem.module.css'

const NavItem = ({ children, linkName, withDropDown }) => {
  return (
    <Link href={'/'} className={classes.wrapper}>
      <div className={classes.main}>
        <button className={classes.link}>
          { linkName }
          { withDropDown && <VscChevronDown className={classes.chevron} /> }
        </button>
        <div className={classes.menu}>
          { children }
        </div>
      </div>
    </Link>
  )
}

export default NavItem