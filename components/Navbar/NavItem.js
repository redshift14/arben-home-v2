import { VscChevronDown } from 'react-icons/vsc'
import classes from './NavItem.module.css'
import classesSidebar from './SidebarItem.module.css' 

const NavItem = ({ children, linkName, withDropDown, sidebar }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.main}>
        <button className={classes.link}>
          { linkName }
          { withDropDown && <VscChevronDown className={classes.chevron} /> }
        </button>
        <div className={classes.menu}>
          { children }
        </div>
      </div>
    </div>
  )
}

export default NavItem