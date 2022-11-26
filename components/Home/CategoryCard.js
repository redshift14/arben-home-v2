import Link from 'next/link'
import classes from './Categories.module.css'

const CategoryCard = ({ image, title, wide }) => {
  return (
    <div 
      className={wide ? `${classes.card} ${classes.wide}` : classes.card} 
      style={{ backgroundImage: `url(${image})` }}
    >
      <h3>{title}</h3>
    </div>
  )
}

export default CategoryCard