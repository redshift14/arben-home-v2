import { useRouter } from 'next/router'
import { BiHomeAlt } from 'react-icons/bi'

import classes from './Bottombar.module.css'

const Bottombar = () => {

  const router = useRouter()

  return (
    <div className={classes.main}>
      <BiHomeAlt className={classes.icon} onClick={() => {router.push('/')}} />
    </div>
  )
}

export default Bottombar