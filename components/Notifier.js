import { MdOutlineDone, MdClose } from 'react-icons/md'
import classes from '../style/Notifier.module.css'

const Notifier = ({ success, message }) => {
  return (
    <div className={classes.main}>
      {
        success ? <MdOutlineDone className={classes.icon_success} /> :
        <MdClose className={classes.icon_error} />
      }
      <p>{message}</p>
    </div>
  )
}

export default Notifier