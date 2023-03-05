import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { VscClose } from 'react-icons/vsc'
import { GiShoppingCart } from 'react-icons/gi'

import { useStateContext } from '../../context/stateContext'

const CartItem = dynamic(() => import('./CartItem'))

import classes from './Cart.module.css'

const Cart = ({ handleClose }) => {

  const { cartItems, totalPrice, totalQuantities } = useStateContext()
  
  const { locale } = useRouter()

  const router = useRouter()

  return (
    <div className={classes.content}>
      <div className={classes.head}>
        <h3>
          {locale === 'ar-DZ' ? 'سلة مشترياتك' : locale === 'fr-FR' ? 'Votre panier' : 'Your cart'} ({totalQuantities})
        </h3>
        <VscClose onClick={handleClose} className={classes.close_icon} />
      </div>
      <div className={classes.main}>
        {
          cartItems.length < 1 && 
          <div className={classes.empty_cart}>
            <GiShoppingCart className={classes.empty_cart_icon} />
            <h3>
              { locale === 'ar-DZ' ? 'سلة تسوقك لا زالت فارغة' : locale === 'fr-FR' ? 'Votre panier est vide' : 'Your shopping cart is empty' }
            </h3>
          </div>
        }
        {
          cartItems.length >= 1 && cartItems.map(item => (
            <CartItem key={item.id + item.size} product={item} />
          ))
        }
      </div>
      <div className={classes.bottom}>
        {
          cartItems.length < 1 && 
          <button onClick={handleClose} className={classes.continue_shopping_btn}>
            { locale === 'ar-DZ' ? 'مواصلة التسوق' : locale === 'fr-FR' ? 'Continuer vos achats' : 'Continue shopping' }
          </button>
        }
        {
          cartItems.length >= 1 && 
          <div className={classes.checkout_container}>
            <div className={classes.subtotal_container}>
              <h6>
                { locale === 'ar-DZ' ? 'المجموع' : locale === 'fr-FR' ? 'Total' : 'Subtotal' }
              </h6>
              <p>{totalPrice}{locale === 'ar-DZ' ? ' دينار جزائري ' : ' DZD '}</p>
            </div>
            <p className={classes.note}>
              { locale === 'ar-DZ' ? 'سيتم احتساب مصاريف الشحن عند مواصلة الدفع.' : locale === 'fr-FR' ? "L'expédition sera calculée à la caisse." : 'Shipping will be calculated at checkout.' }
            </p>
            <div className={classes.buttons}>
              <button 
                className={classes.checkout_btn} 
                onClick={() => { 
                  handleClose()
                  router.push('/checkout') 
                }}>
                { locale === 'ar-DZ' ? 'الدفع' : locale === 'fr-FR' ? 'Passer à la caisse' : 'Proceed to checkout' }
              </button>
              <button onClick={handleClose} className= {classes.continue_shopping_btn}>
                { locale === 'ar-DZ' ? 'مواصلة التسوق' : locale === 'fr-FR' ? 'Continuer vos achats' : 'Continue shopping' }
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Cart