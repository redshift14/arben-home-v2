import { slide as Menu } from 'react-burger-menu'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { VscClose } from 'react-icons/vsc'

import classes from './Cart.module.css'

export default () => {
  return (
    <Menu
      className={classes.menu}
      customBurgerIcon={<HiOutlineShoppingBag />}
      burgerButtonClassName={classes.burger_icon} 
      customCrossIcon={<VscClose />}
      crossButtonClassName={classes.close_icon}
      morphShapeClassName={classes.morph_shape}
      overlayClassName={classes.overlay}
      right
    >
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/salads">
        Salads
      </a>
    </Menu>
  )
}
