import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { useRouter } from 'next/router'

import { BsPlus } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'

import { client } from '../../lib/client'
import { useStateContext } from '../../context/stateContext'

import classes from './CartItem.module.css'

const CartItem = ({ product }) => {

  const { removeProductFromCart, toggleQuantityInCartItem } = useStateContext()

  const { locale } = useRouter()
  
  const { id, name, price, size, quantity, image, maxQty } = product

  const imageProps = useNextSanityImage(client, image)

  return (
    <div className={classes.main}>
      <div className={classes.image_container}>
        <Image {...imageProps} alt='product image' />
      </div>
      <div className={classes.content}>
        <div className={classes.top}>
          <h5>{locale === 'ar-DZ' ? name.ar : locale === 'fr-FR' ? name.fr : name.en}</h5>
          <h6 className={locale === 'ar-DZ' ? classes.size_ar : ''}>{size}</h6>
        </div>
        <div className={classes.bottom}>
          <div className={classes.quantity_container}>
            <button className={classes.add} onClick={() => toggleQuantityInCartItem(id, size, 'inc', maxQty)}>
              <BsPlus />
            </button>
            <p>{quantity}</p>
            <button className={classes.minus} onClick={() => toggleQuantityInCartItem(id, size, 'dec', maxQty)}>
              <BiMinus  />
            </button>
          </div>
          <div className={classes.price_remove}>
            <p>{price}{locale === 'ar-DZ' ? ' دينار جزائري ' : ' DZD '}</p>
            <button onClick={() => removeProductFromCart(product)}>
              {locale === 'ar-DZ' ? 'إزالة' : locale === 'fr-FR' ? 'Supprimer' : 'Remove'}
            </button>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default CartItem