import { useRouter } from 'next/router'
import { useState } from 'react'

import ProductsCards from '../ProductsCards'
import Pagination from '../Products/Pagination'
import { getPaginationCurrentList } from '../../lib/helpers/PaginationFunctions'

import classes from './CategoryPage.module.css'

const CategoryPage = ({ products, imageSrc }) => {
  
  const { locale } = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  
  return (
    <div className={classes.main}>
      <div 
        className={classes.showcase_container} 
        style={{ backgroundImage: `url('${imageSrc}')` }}
      >
        <h2>
          { locale == 'ar-DZ' ? 'لوريم ايبسوم' : locale == 'fr-FR' ? 'Lorem ipsum islo' : 'Lorem ipsum islo'}
        </h2>
      </div>
      <div>
        <ProductsCards 
          products={getPaginationCurrentList(currentPage,productsPerPage,products)} 
          totalItems={products.length} 
          categoryPage={true} 
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