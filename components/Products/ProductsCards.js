import { useRouter } from 'next/router'

import ProductCard from '../ProductCard'
import CustomSortingSelect from './CustomSortingSelect'
import classes from './ProductsCards.module.css'

const ProductsCards = ({ products, totalItems }) => {

  const { locale } = useRouter()

  return (
    <div className={classes.main}>
      <div className={classes.head}>
        <h1>
          { locale === 'ar-DZ' ? 'المنتجات' : locale === 'fr-FR' ? 'Les produits' : 'Products' }
        </h1>
        <div className={classes.search_options_container}>
          <p className={classes.search_options_text}>
            { totalItems }
            { locale === 'ar-DZ' ? ' عناصر' : locale === 'fr-FR' ? ' éléments' : ' items' }
          </p>
          <CustomSortingSelect />
        </div>
      </div>
      <div className={classes.cards}>
        {
          products.map(product => {
            const { _id, slug, name, models, images } = product
            return (
              <ProductCard 
                key={_id}
                slug={slug}
                title={locale == 'fr-FR' ? name.fr : locale == 'ar-DZ' ? name.ar : name.en}
                models={models}
                coverImage1={images[0]}
                coverImage2={images[1]}
                searchPage={true}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default ProductsCards