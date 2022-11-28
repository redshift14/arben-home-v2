import { useRouter } from 'next/router'

import { FaTruck } from 'react-icons/fa'
import { GiCash } from 'react-icons/gi'
import { MdOutlinePublishedWithChanges } from 'react-icons/md'

import classes from './Intro.module.css'

const Intro = () => {

  const { locale } = useRouter()

  return (
    <section className={classes.main}>
      <div className={classes.card}>
        <FaTruck className={classes.icon} />
        <div className={classes.text}>
          <h3>
            {
              locale == 'fr-FR' ? 'Livraison Gratuite' : 
              locale == 'ar-DZ' ? 'توصيل مجاني' : 
              'Free Shipping'
            }
          </h3>          
          <h4>
            {
              locale == 'fr-FR' ? 'sur toutes les commandes supérieures à 4 000,00 DZD' : 
              locale == 'ar-DZ' ? 'على جميع الطلبات التي تزيد عن 4,000.00 دينار جزائري' : 
              'on all orders over 4,000.00 DZD'
            }
          </h4>
        </div>
      </div>
      <div className={classes.card}>
        <GiCash className={classes.icon} />
        <div className={classes.text}>
          <h3>
            {
              locale == 'fr-FR' ? 'Paiement à la Livraison' : 
              locale == 'ar-DZ' ? 'الدفع عند الإستلام' : 
              'Cash on Delivery'
            }
          </h3>          
          <h4>
            {
              locale == 'fr-FR' ? 'Lorem ipsum dolor sit amet' : 
              locale == 'ar-DZ' ? 'لوريم ايبسوم دولار سيت أميت' : 
              'Lorem ipsum dolor sit amet'
            }
          </h4>
        </div>
      </div>
      <div className={classes.card}>
        <MdOutlinePublishedWithChanges className={classes.icon} />
        <div className={classes.text}>
          <h3>
            {
              locale == 'fr-FR' ? 'Changement et Retours' : 
              locale == 'ar-DZ' ? 'الإرجاع والتبديل' : 
              'Change & Returns'
            }
          </h3>
          <h4>
            {
              locale == 'fr-FR' ? 'Lorem ipsum dolor sit amet' : 
              locale == 'ar-DZ' ? 'لوريم ايبسوم دولار سيت أميت' : 
              'Lorem ipsum dolor sit amet'
            }
          </h4>
        </div>
      </div>
    </section>
  )
}

export default Intro