import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { HiOutlineFilter } from 'react-icons/hi' 

import ProductCard from './ProductCard'
import CustomSortingSelect from './CustomSortingSelect'
import FiltersSidebar from './Products/FiltersSidebar'

import searchClasses from '../style/productsCardsStyles/ProductsCardsSearch.module.css'
import categoriesClasses from '../style/productsCardsStyles/ProductsCardsCategories.module.css'

const ProductsCards = ({ searchPage, categoryPage, relatedPage, products, totalItems, currentCat, currentCategoryName }) => {
  
  const { main, head, search_options_container, search_options_text, cards, sidebar_icon_container, sidebar_icon, sidebar_container, sidebar_container_ar, sidebar_container_hidden, sidebar_container_hidden_ar, overlay, title } = categoryPage ? categoriesClasses : searchClasses

  const { locale } = useRouter()

  const [windowWidth, setWindowWidth] = useState()

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  },[windowWidth])

  const [showSidebar, setShowSidebar] = useState(false)

  const handleCloseSidebar = () => {
    setShowSidebar(false)
  }
  const handleShowSidebar = () => {
    setShowSidebar(true)
  }

  return (
    <div className={main}>
      <div className={head}>
        { 
          !searchPage && <h1 className={title}>{currentCategoryName}</h1> 
        }
        { 
          searchPage && windowWidth > 1000 && 
          <h1 className={title}>{currentCategoryName}</h1> 
        }
        {
          searchPage && windowWidth < 1000 &&
          <div className={sidebar_icon_container}>
            <HiOutlineFilter className={sidebar_icon} onClick={handleShowSidebar} />
          </div>
        }
        {
          searchPage &&
          <div
            className={locale === 'ar-DZ' ? (showSidebar ? sidebar_container_ar : `${sidebar_container_hidden_ar} ${sidebar_container_ar}`) : (showSidebar ?sidebar_container : `${sidebar_container} ${sidebar_container_hidden}`)} 
          >
            <FiltersSidebar locale={locale} handleCloseSidebar={handleCloseSidebar} />
          </div>
        }
        <div className={search_options_container}>
          <p className={search_options_text}>
            { totalItems }
            { locale === 'ar-DZ' ? ' عناصر' : locale === 'fr-FR' ? ' éléments' : ' items' }
          </p>
          <CustomSortingSelect categoryPage={categoryPage} currentCat={currentCat} />
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
                locale={locale}
              />
            )
          })
        }
      </div>
      { showSidebar && <div className={overlay}></div> }
    </div>
  )
}

export default ProductsCards