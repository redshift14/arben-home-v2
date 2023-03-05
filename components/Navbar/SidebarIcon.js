import { BiMenu } from 'react-icons/bi'

import classes from './Navbar.module.css'

const SidebarIcon = ({ sidebarIconRef, handleShowSidebar }) => {
  return (
    <div ref={sidebarIconRef}>
      <BiMenu 
        className={classes.sidebar_icon} 
        onClick={handleShowSidebar} 
      />
    </div>
  )
}

export default SidebarIcon