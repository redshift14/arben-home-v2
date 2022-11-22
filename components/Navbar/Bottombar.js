import { BiHomeAlt } from 'react-icons/bi'

import classes from './Bottombar.module.css'

const Bottombar = () => {
  return (
    <div className={classes.main}>
      <BiHomeAlt className={classes.icon} />
    </div>
  )
}

export default Bottombar