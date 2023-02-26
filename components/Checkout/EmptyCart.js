import { useRouter } from 'next/router'

import { GiShoppingCart } from 'react-icons/gi'

import classes from './EmptyCart.module.css'

const EmptyCart = () => {

  const { locale } = useRouter()

  const router = useRouter()

  return (
    <div className={classes.main}>
      <div className={classes.icon_container}>
        <GiShoppingCart />
      </div>
      <div className={classes.content}>
        <h1>
          {
            locale == 'ar-DZ' ? 'سلة المشتريات فارغة' : locale == 'fr-FR' ? 'Votre panier est vide' : 'Your cart is empty'
          }
        </h1>
        <button onClick={() => router.push('/products')}>
          {
            locale == 'ar-DZ' ? 'عودة إلى المتجر' : locale == 'fr-FR' ? 'Retour à la boutique' : 'Return to shop'
          }
        </button>
      </div>
    </div>
  )
}

export default EmptyCart