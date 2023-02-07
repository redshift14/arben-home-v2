import { useRouter } from 'next/router'
import { useNextSanityImage } from 'next-sanity-image'

import { useStateContext } from '../../context/stateContext'
import { urlFor, client } from '../../lib/client'

import classes from './SummaryCard.module.css'

const SummaryCard = () => {

  const { locale } = useRouter()

  const { cartItems, totalPrice } = useStateContext()

  const textDirection = locale == 'ar-DZ' ? 'right' : 'left'

  return (
    <div className={classes.main}>
      <h3>
        {
          locale == 'ar-DZ' ? 'كشف الطلبية' : locale == 'fr-FR' ? 'Récapitulatif de la commande' : 'Order summary'
        }
      </h3>
      <div className={classes.cards}>
        {
          cartItems.map(item => {

            const { id, name, image, price, size, quantity } = item

            return (
              <div className={classes.card} key={id}>
                <div className={classes.image_container}>
                  <img src={urlFor(image).url()} alt='product image' />
                </div>
                <div className={classes.product_content}>
                  <h4>
                    { size }{ ' ' }
                    { locale == 'ar-DZ' ? name.ar : locale == 'fr-FR' ? name.fr : name.en }
                  </h4>
                  <h5 style={{ textAlign: textDirection }} >
                  { price }{ locale == 'ar-DZ' ? ' دينار ' : ' DZD ' }{ ' x ' }{ quantity }
                  </h5>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={classes.totals}>
        <div className={classes.totals_item}>
          <h4>
            {
              locale == 'ar-DZ' ? 'صافي المجموع:' : locale == 'fr-FR' ? 'Total:' : 'Subtotal:'
            }
          </h4>
          <h4>
            { totalPrice }{ locale == 'ar-DZ' ? ' دينار ' : ' DZD' }
          </h4>
        </div>
        <div className={classes.totals_item}>
          <h4>
            {
              locale == 'ar-DZ' ? 'التوصيل:' : locale == 'fr-FR' ? 'Livraison:' : 'Delivery:'
            }
          </h4>
          <h4>
            500 
            { locale == 'ar-DZ' ? ' دينار ' : ' DZD' }
          </h4>
        </div>
        <hr className={classes.seperator} />
        <div className={classes.totals_item}>
          <h4>
            {
              locale == 'ar-DZ' ? 'المجموع النهائي:' : locale == 'fr-FR' ? 'Total finale:' : 'Total:'
            }
          </h4>
          <h4>
            { 500 + totalPrice } 
            { locale == 'ar-DZ' ? ' دينار ' : ' DZD' }
          </h4>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard