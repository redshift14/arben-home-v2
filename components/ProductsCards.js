import { useRouter } from 'next/router'

import ProductCard from './ProductCard'
import CustomSortingSelect from './Products/CustomSortingSelect'

import searchClasses from '../style/productsCardsStyles/ProductsCardsSearch.module.css'
import categoriesClasses from '../style/productsCardsStyles/ProductsCardsCategories.module.css'

import { getPageTitle } from '../lib/helpers/generalFunctions'

const ProductsCards = ({searchPage, categoryPage, relatedPage, products, totalItems}) => {
  
  const { main, head, search_options_container, search_options_text, cards } = categoryPage ? categoriesClasses : searchClasses

  const { locale, asPath } = useRouter()

  return (
    <div className={main}>
      <div className={head}>
        <h1>
          { getPageTitle(categoryPage, asPath, locale) }
        </h1>
        <div className={search_options_container}>
          <p className={search_options_text}>
            { totalItems }
            { locale === 'ar-DZ' ? ' عناصر' : locale === 'fr-FR' ? ' éléments' : ' items' }
          </p>
          <CustomSortingSelect categoryPage={categoryPage} />
        </div>
      </div>
      <div className={cards}>
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
                categoryPage={categoryPage}  
                relatedPage={relatedPage}
                searchPage={searchPage}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default ProductsCards