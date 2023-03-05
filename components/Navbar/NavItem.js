import { useState } from 'react'
import { useRouter } from 'next/router'

import { VscChevronDown } from 'react-icons/vsc'

import navClasses from './NavItem.module.css'
import sideClasses from './NavItemSidebar.module.css'

const NavItem = ({ children, linkName, withDropDown, sidebar, to, handleClose, locale }) => {

  const { wrapper, wrapper_ar, main, link, chevron, menu, hidden, rotated } = sidebar ? sideClasses : navClasses

  const [openMenuSidebar, setOpenMenuSidebar] = useState(false)

  const router = useRouter()

  const handleOpenMenuSidebar = () => {
    if (sidebar) setOpenMenuSidebar(value => value = !value) 
  }

  const handleRouterPush = () => {
    if (to !== undefined && !withDropDown && sidebar) {
      router.push(to)
      handleClose()
    } 
    else if(!sidebar && to !== undefined && !withDropDown) {
      router.push(to)
    }
  }

  return (
    <div className={locale == 'ar-DZ' ? `${wrapper} ${wrapper_ar}` : wrapper}>
      <div className={main} onClick={handleRouterPush}>
        <button className={link} onClick={handleOpenMenuSidebar}>
          { linkName }
          { withDropDown && <VscChevronDown className={openMenuSidebar  ? `${chevron} ${rotated}` : chevron } /> }
        </button>
        <div 
          className={openMenuSidebar ? menu : `${menu} ${hidden}`}
          style={locale == 'ar-DZ' ? {left: 'auto', right: 0} : {left: 0, right: 'auto'} }
        >
          { children }
        </div>
      </div>
    </div>
  )
}

export default NavItem