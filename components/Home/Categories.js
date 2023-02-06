import { useRouter } from 'next/router'

import classes from './Categories.module.css'
import CategoryCard from './CategoryCard'

import { urlFor } from '../../lib/client'

const Categories = ({ data }) => {

  const { locale } = useRouter()

  const links = ['products?category=quilt+cover', '/products?category=pillowcase', '/products?category=bed+sheets']

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
        {
          data.length === 3 && data.map((info, index) => {
            const { _key, interfaceCategoryImage, interfaceCategoryName } = info
            return (
              <CategoryCard 
                key={_key}
                image={urlFor(interfaceCategoryImage).url()} 
                title={locale == 'fr-FR' ? interfaceCategoryName.fr : locale == 'ar-DZ' ? interfaceCategoryName.ar : interfaceCategoryName.en} 
                wide={index === 2}
                to={links[index]}
              />
            )
          })
        }
      </div>
    </section>
  )
}

export default Categories