import { useState } from 'react'
import { useRouter } from 'next/router'

import { VscChevronDown } from 'react-icons/vsc'

import navClasses from './NavItem.module.css'
import sideClasses from './NavItemSidebar.module.css'

const NavItem = ({ children, linkName, withDropDown, sidebar, to }) => {

  const { locale } = useRouter()

  const router = useRouter()

  const { wrapper, wrapper_ar, main, menu_ar, link, chevron, menu, hidden, rotated } = sidebar ? sideClasses : navClasses

  const [openMenuSidebar, setOpenMenuSidebar] = useState(false)

  const handleOpenMenuSidebar = () => {
    if (sidebar) {
      setOpenMenuSidebar(value => value = !value)
    }
  }

  const handleRouterPush = (to) => {
    if(!sidebar && withDropDown) {
      router.push(to)
    }
  }

  return (
    <div className={locale == 'ar-DZ' ? `${wrapper} ${wrapper_ar}` : wrapper} onClick={() => handleRouterPush(to)}>
      <div className={main}>
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