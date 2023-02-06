import Link from 'next/link'
import classes from './Categories.module.css'

const CategoryCard = ({ image, title, wide, to }) => {
  return (
    <Link href={to} style={{ width: '100%' }} className={wide ? classes.wide : ''}>
      <div 
        className={classes.card} 
        style={{ backgroundImage: `url(${image})` }}
      >
        <h3>{title}</h3>
      </div>
    </Link>
  )
}

export default CategoryCard