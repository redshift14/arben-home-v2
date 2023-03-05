import { useRouter } from 'next/router'
import ProductCard from '../ProductCard'
import classes from './RelatedProducts.module.css'

const RelatedProducts1 = ({ products }) => {

  const { locale } = useRouter()

  return (
    products.length > 0 &&
    <div className={classes.main}>
      <h2 className={classes.title}>
        {
          locale == 'ar-DZ' ? 'منتجات ذات صلة' : 
          locale == 'fr-FR' ? 'Produits connexes' : 'Related products'
        }
      </h2>
      <hr className={classes.seperator} />
      <div className={classes.cards}>
        {
          products.map(product =>  {
            const { _id, slug, name, models, images } = product
            return (
              <ProductCard 
                key={_id}
                slug={slug}
                title={locale == 'fr-FR' ? name.fr : locale == 'ar-DZ' ? name.ar : name.en}
                models={models}
                coverImage1={images[0]}
                coverImage2={images[1]}
                relatedPage={true}
                locale={locale}
              /> 
            )
          }) 
        }
      </div>
    </div>
  )
}

export default RelatedProducts1