import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import { paginate, nextPage, prevPage } from '../lib/helpers/PaginationFunctions'
import classes from '../style/Pagination.module.css'

const Pagination = ({ productsPerPage, totalProducts, setCurrentPage, currentPage }) => {

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [currentPage])

  const { locale } = useRouter()

  const nextAriaLabel = locale == 'ar-DZ' ? 'الى صفحة المنتجات التالية' : locale == 'fr-FR' ? 'Vers la page de produits suivante' : 'To next products page'
  const byNumberAriaLabel = locale == 'ar-DZ' ? 'الى صفحة المنتجات ذات الرقم' : locale == 'fr-FR' ? 'Vers la page des produits avec le numéro' : 'To products page with the number'
  const prevAriaLabel = locale == 'ar-DZ' ? 'الى صفحة المنتجات السابقة' : locale == 'fr-FR' ? 'Vers la page des produits précédents' : 'To previous products page'

  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        <li>
          <button 
            aria-label={nextAriaLabel}
            className={locale === 'ar-DZ' ? `${classes.icon_btn} ${classes.icon_btn_ar}` : classes.icon_btn} 
            onClick={() => prevPage(currentPage, setCurrentPage)}
          >
            <BsChevronLeft />
          </button>
        </li>
        {
          pageNumbers.map(number => (
            <li key={number}>
              <button 
                aria-label={byNumberAriaLabel}
                className={currentPage === number ? classes.current_btn : ''} 
                onClick={() => paginate(number, setCurrentPage)}
              >
                {number}
              </button>
            </li>
          ))
        }
        <li>
          <button 
            aria-label={prevAriaLabel}
            className={locale === 'ar-DZ' ? `${classes.icon_btn} ${classes.icon_btn_ar}` : classes.icon_btn} 
            onClick={() => nextPage(pageNumbers.length, currentPage, setCurrentPage)}
          >
            <BsChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination