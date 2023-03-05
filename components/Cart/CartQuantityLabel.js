import classess from './CartQuantityLabel.module.css'

import { useStateContext } from '../../context/stateContext'

const CartQuantityLabel = ({ locale }) => {

  const { cartItems, totalQuantities } = useStateContext()

  return (
    cartItems.length > 0 && 
    <div className={locale === 'ar-DZ' ? `${classess.cart_quantity} ${classess.cart_quantity_ar}` : classess.cart_quantity}>{totalQuantities}</div>
  )
}

export default CartQuantityLabel