import { useRouter } from 'next/router'

import classes from './Categories.module.css'
import CategoryCard from './CategoryCard'

import Image1 from '../../public/assets/quilt-cover.webp'
import Image2 from '../../public/assets/pillowcases.jpg'
import Image3 from '../../public/assets/bed-sheets.jpg'

const Categories = () => {

  const { locale } = useRouter()

  return (
    <section className={classes.main}>
      <h2>
        {
          locale == 'fr-FR' ? 'Catégories Vedettes' : 
          locale == 'ar-DZ' ? 'الفئات المتميزة' : 
          'Featured Categories'
        }
      </h2>
      <div className={classes.cards}>
        <CategoryCard 
          image={Image1.src} 
          title={locale == 'fr-FR' ? 'Housses de Couette' : locale == 'ar-DZ' ? 'أغلية لحاف' : 'Quilt Covers'} 
        />
        <CategoryCard 
          image={Image2.src} 
          title={locale == 'fr-FR' ? "Taies d'oreiller" : locale == 'ar-DZ' ? 'اغلفة وسادات' : 'Pillowcases'} 
        />
        <CategoryCard 
          image={Image3.src} 
          title={locale == 'fr-FR' ? 'Draps de lit' : locale == 'ar-DZ' ? 'شراشف' : 'Bed Sheets'} 
          wide={true} />
      </div>
    </section>
  )
}

export default Categories