import { useState } from 'react'

import classes from './MainPage.module.css'

import FilterMenu from './FilterMenu'
import ProductsCards from './ProductsCards'
import Pagination from './Pagination'

import { useStateContext } from '../../context/stateContext'

const MainPage = () => {

  const { productsList } = useStateContext()

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setPostsPerPage] = useState(6)

  const indexOfLastPost = currentPage * productsPerPage
  const indexOfFirstPost = indexOfLastPost - productsPerPage
  const currentProducts = productsList.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const nextPage = (maxNumber) => {
    if (currentPage < maxNumber) {
      setCurrentPage(v => v = v+1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(v => v = v-1)
    }
  }

  return (
    <div className={classes.main}>
      <div className={classes.menu_container}>
        <FilterMenu />
      </div>
      <div className={classes.cards_container}>
        <ProductsCards products={currentProducts} totalItems={productsList.length} />
        {
          productsList.length >= productsPerPage && 
          <Pagination 
            productsPerPage={productsPerPage} 
            totalProducts={productsList.length} 
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
          />
        }
      </div>
    </div>
  )
}

export default MainPage