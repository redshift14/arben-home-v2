import { FaTruck } from 'react-icons/fa'
import { GiCash } from 'react-icons/gi'
import { MdOutlinePublishedWithChanges } from 'react-icons/md'

import classes from './Intro.module.css'

const Intro = () => {
  return (
    <section className={classes.main}>
      <div className={classes.card}>
        <FaTruck className={classes.icon} />
        <div className={classes.text}>
          <h3>Free Shipping</h3>
          <h4>on all orders over 4,000.00 DZD</h4>
        </div>
      </div>
      <div className={classes.card}>
        <GiCash className={classes.icon} />
        <div className={classes.text}>
          <h3>Cash on Delivery</h3>
          <h4>Lorem ipsum dolor sit amet</h4>
        </div>
      </div>
      <div className={classes.card}>
        <MdOutlinePublishedWithChanges className={classes.icon} />
        <div className={classes.text}>
          <h3>Change or Return</h3>
          <h4>Lorem ipsum dolor sit</h4>
        </div>
      </div>
    </section>
  )
}

export default Intro