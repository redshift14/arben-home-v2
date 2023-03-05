import { HiOutlineShoppingBag } from 'react-icons/hi'

import { useStateContext } from '../../context/stateContext'
import classes from '../Navbar/Navbar.module.css'

const CartIcon = ({ cartMenuIconRef, handleShowCart }) => {

  const { cartItems, totalQuantities } = useStateContext()

  return (
    <div className={classes.cart_icon_container}>
      <div ref={cartMenuIconRef}>
        <HiOutlineShoppingBag 
          onClick={handleShowCart}
          className={classes.cart_icon} 
        />
      </div>
      {
        cartItems.length > 0 &&
        <div className={classes.cart_quantity}>
          {totalQuantities}
        </div>
      }
    </div>
  )
}

export default CartIcon