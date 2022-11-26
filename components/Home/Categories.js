import classes from './Categories.module.css'
import CategoryCard from './CategoryCard'

import Image1 from '../../public/assets/quilt-cover.webp'
import Image2 from '../../public/assets/pillowcases.jpg'
import Image3 from '../../public/assets/bed-sheets.jpg'

const Categories = () => {
  return (
    <section className={classes.main}>
      <h2>Featured Categories</h2>
      <div className={classes.cards}>
        <CategoryCard image={Image1.src} title='Quilt Covers' />
        <CategoryCard image={Image2.src} title='Pillowcases' />
        <CategoryCard image={Image3.src} title='Bed Sheets' wide={true} />
      </div>
    </section>
  )
}

export default Categories