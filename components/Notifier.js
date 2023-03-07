import { MdOutlineDone, MdClose } from 'react-icons/md'
import classes from '../style/Notifier.module.css'

const Notifier = ({ success, message }) => {
  return (
    <div className={classes.main}>
        {
          success ? 
          <span className={classes.icon_success_container}>
            <MdOutlineDone className={classes.icon_success} /> 
          </span> :
          <span className={classes.icon_error_container}>
            <MdClose className={classes.icon_error} />
          </span>
        }
      <p>{message}</p>
    </div>
  )
}

export default Notifier