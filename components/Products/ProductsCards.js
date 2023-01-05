import { useRouter } from 'next/router'

import ProductCard from '../ProductCard'
import CustomSortingSelect from './CustomSortingSelect'
import classes from './ProductsCards.module.css'

const ProductsCards = ({ products }) => {

  const { locale } = useRouter()

  return (
    <div className={classes.main}>
      <div className={classes.head}>
        <h1>
          { locale === 'ar-DZ' ? 'المنتجات' : locale === 'fr-FR' ? 'Les produits' : 'Products' }
        </h1>
        <div className={classes.search_options_container}>
          <p className={classes.search_options_text}>
            { products.length }
            { locale === 'ar-DZ' ? ' عناصر' : locale === 'fr-FR' ? ' éléments' : ' items' }
          </p>
          <CustomSortingSelect />
        </div>
      </div>
      <div className={classes.cards}>
        {
          products.map(product => (
            <ProductCard 
              key={product._id}
              slug={product.slug}
              title={locale == 'fr-FR' ? product.name.fr : locale == 'ar-DZ' ? product.name.ar : product.name.en}
              startingPrice={product.price[0]}
              sizes={product.sizes}
              coverImage={product.images[0]}
              searchPage={true}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ProductsCards