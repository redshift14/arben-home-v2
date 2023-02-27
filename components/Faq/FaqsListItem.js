import { useState } from 'react'
import { VscChevronDown } from 'react-icons/vsc'
import classes from './FaqsList.module.css'

const FaqsListItem = ({ question, answer }) => {

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(v => v = !v)
  }

  return (
    <div className={open ? `${classes.item} ${classes.item_open}` : classes.item}>
      <div className={classes.item_nav} onClick={handleClick}>
        <h3>{question}</h3>
        <div className={classes.icon_container}>
          <VscChevronDown 
            className={open ? `${classes.icon} ${classes.icon_open}` : classes.icon}
          />
        </div>
      </div>
      <div
        className={open ? `${classes.item_content} ${classes.item_content_open}` : classes.item_content}
      >
        <p>{answer}</p>
      </div>
    </div>
  )
}

export default FaqsListItem