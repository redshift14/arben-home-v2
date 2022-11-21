import { slide as Menu } from 'react-burger-menu'
import { BiMenu } from 'react-icons/bi'
import { VscClose, VscChevronDown } from 'react-icons/vsc'

import Image from 'next/image'
import Link from 'next/link'

import SidebarItem from './SidebarItem'
import NavItem from './NavItem'
import Logo from '../../public/assets/logoSmall.webp'
import { aboutLinks } from './links'
import classes from './Sidebar.module.css'

export default () => {
  return (
    <Menu
      className={classes.menu}
      customBurgerIcon={<BiMenu />}
      burgerButtonClassName={classes.burger_icon} 
      customCrossIcon={<VscClose />}
      crossButtonClassName={classes.close_icon}
      morphShapeClassName={classes.morph_shape}
      overlayClassName={classes.overlay}
      itemListClassName={classes.item_list}
      itemClassName={classes.item}
      width={400}
    >
      <div className={classes.content}>
        <div className={classes.head}>
          <Link href={'/'}>
            <Image src={Logo} width={150} height={'auto'} />
          </Link>
        </div>
        <div className={classes.main}>
          <SidebarItem sidebar={true} />
        </div>
        <div className={classes.icons}>

        </div>
      </div>
    </Menu>
  )
}
