import dynamic from 'next/dynamic'
import classes from './Categories.module.css'

const CategoryCard = dynamic(() => import('./CategoryCard'))

const Categories = ({ data, locale }) => {

  const links = ['/category/quilt cover', '/category/pillowcase', '/category/bed sheet']

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
                bgImage={interfaceCategoryImage} 
                titleEn={interfaceCategoryName.en}
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