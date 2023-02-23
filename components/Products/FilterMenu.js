import { useEffect } from 'react'
import { useRouter } from 'next/router'

import FiltersListLabels from './FiltersListLabels'
import FilterMenuContent from './FilterMenuContent'
import classes from './FilterMenu.module.css'

import { useStateContext } from '../../context/stateContext'

const FilterMenu = () => {
  
  const { locale } = useRouter()

  const router = useRouter()

  const { handleResetFilters, setSelectedAllFiltersWithTranslation, setSelectedCategories } = useStateContext()

  useEffect(() => {

    setTimeout(() => {        
      if (router.query.category) {
        setSelectedAllFiltersWithTranslation([router.query.category])
        setSelectedCategories([router.query.category])
      }
    }, 300)
  }, [])

  return (
    <div className={classes.main}>
      <div className={classes.head}>
        <div className={classes.head_text}>
          <h2>{ locale === 'ar-DZ' ? 'تصفية' : locale === 'fr-FR' ? 'Filtres' : 'Filters' }</h2>
          <button onClick={() => handleResetFilters()}>
            { locale === 'ar-DZ' ? 'تهيئة' : locale === 'fr-FR' ? 'Tout effacer' : 'Clear all'}
          </button>
        </div>
        <FiltersListLabels /> 
      </div>
      <div className={classes.content}>
        <FilterMenuContent />
      </div>
    </div>
  )
}

export default FilterMenu