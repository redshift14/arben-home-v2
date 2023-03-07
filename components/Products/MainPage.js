import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import classes from './MainPage.module.css'
import Loading from '../Loading'

const ProductsCards = dynamic(() => import('../ProductsCards'), {
  loading: () => <Loading /> 
})
const FilterMenu = dynamic(() => import('./FilterMenu'), {
  loading: () => <Loading /> 
})
const Pagination = dynamic(() => import('../Pagination'), {
  loading: () => <Loading /> 
})

import { useStateContext } from '../../context/stateContext'
import { getPaginationCurrentList } from '../../lib/helpers/PaginationFunctions'

const MainPage = () => {

  const { productsList } = useStateContext()

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(9)

  const currentProductsList = getPaginationCurrentList(currentPage,productsPerPage,productsList)

  // set current paginated page to the first one if the current products are zero
  useEffect(() => {
    if (currentProductsList.length == 0 ) setCurrentPage(1)
  }, [currentProductsList, currentPage])

  return (
    <div className={classes.main}>
      <div className={classes.menu_container}>
        <FilterMenu />
      </div>
      <div className={classes.cards_container}>
        <ProductsCards 
          searchPage={true} 
          products={currentProductsList} 
          totalItems={productsList.length} 
        />
        {
          productsList.length > productsPerPage && 
          <Pagination 
            productsPerPage={productsPerPage} 
            totalProducts={productsList.length} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        }
      </div>
    </div>
  )
}

export default MainPage