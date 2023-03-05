import { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const FiltersListLabels = dynamic(() => import('./FiltersListLabels'))
const FilterMenuContent = dynamic(() => import('./FilterMenuContent'))

import { useStateContext } from '../../context/stateContext'
import { translateFilter } from '../../lib/helpers/filterMenuItemsHandlers'

import classes from './FilterMenu.module.css'

const FilterMenu = () => {
  
  const { locale } = useRouter()

  const router = useRouter()

  const { 
    handleResetFilters, setSelectedAllFiltersWithTranslation, setSelectedCategories, setSelectedColors, setSelectedMaterials ,setSelectedStyles, allCategories, allColors, allMaterials, allStyles
  } = useStateContext()

  const categoriesNames = allCategories.map(category => (category.categoryName))
  const colorsNames = allColors.map(color => (color.colorName))
  const materialsNames = allMaterials.map(material => (material.materialName))
  const stylesNames = allStyles.map(style => (style.styleName))

  useEffect(() => {
    if (router.query.category) {
      setSelectedAllFiltersWithTranslation([translateFilter(
        router.query.category, 'category', locale, categoriesNames
      )])
      setSelectedCategories([router.query.category])
    }
    if (router.query.color) {
      setSelectedAllFiltersWithTranslation([translateFilter(
        router.query.color, 'color', locale, undefined, colorsNames
      )])
      setSelectedColors([router.query.color])
    }
    if (router.query.material) {
      setSelectedAllFiltersWithTranslation([translateFilter(
        router.query.material, 'material', locale, undefined, undefined, materialsNames
      )])
      setSelectedMaterials([router.query.material])
    }
    if (router.query.style) {
      setSelectedAllFiltersWithTranslation([translateFilter(
        router.query.style, 'style', locale, undefined, undefined, undefined, stylesNames
      )])
      setSelectedStyles([router.query.style])
    }
  }, [])

  return (
    <div className={classes.main}>
      <div className={classes.head}>
        <div className={classes.head_text}>
          <h2>
            { locale === 'ar-DZ' ? 'تصفية' : locale === 'fr-FR' ? 'Filtres' : 'Filters' }
          </h2>
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