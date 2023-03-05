import dynamic from 'next/dynamic'
import classes from './RecentProducts.module.css'

const ProductCard = dynamic(() => import('../ProductCard'))

const RecentProducts = ({ products, locale }) => {

  return (
    <section className={classes.main}>
      <h2>
        {
          locale == 'fr-FR' ? 'Produits Recents' : 
          locale == 'ar-DZ' ? 'أحدث المنتجات' : 
          'Recent Products'
        }
      </h2>
      {
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
                  searchPage={false}
                  locale={locale}
                />
              )
            })
          }
        </div>
      }
    </section>
  )
}

export default RecentProducts