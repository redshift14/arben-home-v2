import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import Loading from '../Loading'

const ProductsCards = dynamic(() => import('../ProductsCards'), {
  loading: () => <Loading />
})
const Pagination = dynamic(() => import('../Pagination'), {
  loading: () => <Loading />
})

import { getPaginationCurrentList } from '../../lib/helpers/PaginationFunctions'

import { client } from '../../lib/client'

import classes from './CategoryPage.module.css'

const CategoryPage = ({ products, imageData, currentCat, locale, currentCategoryName }) => {

  const imageProps = useNextSanityImage(client, imageData)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  
  return (
    <div className={classes.main}>
      <div className='showcase-with-bg-image'>
        <Image 
          {...imageProps} 			
          style={{ width: '100%', height: '100%', objectFit:'cover' }} 
          loader={imageProps.loader}
          alt='bed sheets black and white'
          sizes='100vw'
          priority
        />
        <h2>
          {
            locale == 'ar-DZ' ? 'لوريم ايبسوم' : locale == 'fr-FR' ? 'Lorem ipsum islo' : 'Lorem ipsum islo'
          }
        </h2>
      </div>
      <div>
        <ProductsCards 
          products={getPaginationCurrentList(currentPage,productsPerPage,products)} 
          totalItems={products.length} 
          categoryPage={true} 
          currentCat={currentCat}
          currentCategoryName={currentCategoryName}
        />
        {
          products.length >= productsPerPage && 
          <Pagination 
            productsPerPage={productsPerPage} 
            totalProducts={products.length} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        }
      </div>
    </div>
  )
}

export default CategoryPage