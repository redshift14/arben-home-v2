import { useState } from 'react'

import { VscChevronDown } from 'react-icons/vsc'

import navClasses from './NavItem.module.css'
import sideClasses from './NavItemSidebar.module.css'

const NavItem = ({ children, linkName, withDropDown, sidebar }) => {

  const { wrapper, main, link, chevron, menu, hidden, rotated } = sidebar ? sideClasses : navClasses

  const [openMenuSidebar, setOpenMenuSidebar] = useState(false)

  const handleOpenMenuSidebar = () => {
    if (sidebar) {
      setOpenMenuSidebar(value => value = !value)
    }
  }

  return (
    <div className={wrapper}>
      <div className={main}>
        <button className={link} onClick={handleOpenMenuSidebar}>
          { linkName }
          { withDropDown && <VscChevronDown className={openMenuSidebar  ? `${chevron} ${rotated}` : chevron } /> }
        </button>
        <div className={openMenuSidebar ? menu : `${menu} ${hidden}`}>
          { children }
        </div>
      </div>
    </div>
  )
}

export default NavItem