import { useEffect } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import classes from './Pagination.module.css'

const Pagination = ({ productsPerPage, totalProducts, paginate, nextPage, prevPage, currentPage }) => {

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [currentPage])

  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        <li>
          <button className={classes.icon_btn} onClick={() => prevPage()}>
            <BsChevronLeft />
          </button>
        </li>
        {
          pageNumbers.map(number => (
            <li key={number}>
              <button 
                className={currentPage === number ? classes.current_btn : ''} 
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))
        }
        <li>
          <button className={classes.icon_btn} onClick={() => nextPage(pageNumbers.length)}>
            <BsChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination