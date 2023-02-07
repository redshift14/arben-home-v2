import { useRouter } from 'next/router'
import { useState } from 'react'

import { slide as Menu } from 'react-burger-menu'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { VscClose } from 'react-icons/vsc'
import { GiShoppingCart } from 'react-icons/gi'

import { useStateContext } from '../../context/stateContext'

import CartItem from './CartItem'

import classes from './Cart.module.css'

const Cart =  () => {

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenMenu = () => {
    setIsOpen(v => { return !v })
  }

  const { locale } = useRouter()

  const router = useRouter()

  const { cartItems, totalPrice, totalQuantities } = useStateContext()

  return (
    <Menu
      className={locale == 'ar-DZ' ? `${classes.menu_ar} ${classes.menu}` : classes.menu}
      customBurgerIcon={<HiOutlineShoppingBag />}
      burgerButtonClassName={locale == 'ar-DZ' ? `${classes.burger_icon} ${classes.burger_icon_ar}` : classes.burger_icon} 
      customCrossIcon={<VscClose />}
      crossButtonClassName={locale == 'ar-DZ' ? `${classes.close_icon_ar}` : classes.close_icon}
      morphShapeClassName={classes.morph_shape}
      overlayClassName={classes.overlay}
      right={locale == 'ar-DZ' ? false : true}
      isOpen={isOpen}
      onOpen={handleOpenMenu}
      onClose={handleOpenMenu}
      width={400}
    >
      <div className={classes.content}>
        <div className={locale === 'ar-DZ' ? `${classes.head} ${classes.head_ar}` : classes.head}>
          <h3>
            {locale === 'ar-DZ' ? 'سلة مشترياتك' : locale === 'fr-FR' ? 'Votre panier' : 'Your cart'} ({totalQuantities})
          </h3>
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
            <button onClick={handleOpenMenu} className={classes.continue_shopping_btn}>
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
                    router.push('/checkout') 
                    setIsOpen(false)
                  }}>
                  { locale === 'ar-DZ' ? 'الدفع' : locale === 'fr-FR' ? 'Passer à la caisse' : 'Proceed to checkout' }
                </button>
                <button onClick={handleOpenMenu} className= {classes.continue_shopping_btn}>
                  { locale === 'ar-DZ' ? 'مواصلة التسوق' : locale === 'fr-FR' ? 'Continuer vos achats' : 'Continue shopping' }
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </Menu>
  )
}

export default Cart