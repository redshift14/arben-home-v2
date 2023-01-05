import { useRouter } from 'next/router'
import classes from './RecentProducts.module.css'
import ProductCard from '../ProductCard'

const RecentProducts = ({ products }) => {

  const { locale } = useRouter()

  return (
    <section className={classes.main}>
      <h2>
        {
          locale == 'fr-FR' ? 'Produits Recents' : 
          locale == 'ar-DZ' ? 'أحدث المنتجات' : 
          'Recent Products'
        }
      </h2>
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
              searchPage={false}
            />
          ))
        }
      </div>
    </section>
  )
}

export default RecentProducts