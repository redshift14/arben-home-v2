import { useEffect } from 'react'
import { useRouter } from 'next/router'

import FiltersListLabels from './FiltersListLabels'
import FilterMenuContent from './FilterMenuContent'
import classes from './FilterMenu.module.css'

import { useStateContext } from '../../context/stateContext'

const FilterMenu = () => {
  
  const { locale } = useRouter()

  const router = useRouter()

  const { 
    handleResetFilters, setSelectedAllFiltersWithTranslation, selectedAllFiltersWithTranslation, setSelectedCategories, selectedCategories, setSelectedColors, selectedColors, setSelectedMaterials, selectedMaterials, setSelectedStyles, selectedStyles
  } = useStateContext()

  useEffect(() => {

    if (router.query.category) {
      setSelectedAllFiltersWithTranslation(
        [router.query.category]
      )
      setSelectedCategories([router.query.category])
    }
    if (router.query.color) {
      setSelectedAllFiltersWithTranslation(
        [router.query.color]
      )
      setSelectedColors([router.query.color])
    }
    if (router.query.material) {
      setSelectedAllFiltersWithTranslation(
        [router.query.material]
      )
      setSelectedMaterials([router.query.material])
    }
    if (router.query.style) {
      setSelectedAllFiltersWithTranslation(
        [router.query.style]
      )
      setSelectedStyles([router.query.style])
    }

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