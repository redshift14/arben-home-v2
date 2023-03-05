import FiltersListLabels from './FiltersListLabels'
import FilterMenuContent from './FilterMenuContent'

import { BsArrowLeftShort } from 'react-icons/bs'

import { useStateContext } from '../../context/stateContext'
import classes from './FiltersSidebar.module.css'

const FiltersSidebar = ({ locale, handleCloseSidebar }) => {

  const { handleResetFilters } = useStateContext()

  const handleClearFiltersEvent = () => {
    handleCloseSidebar()
    handleResetFilters()
  }

  return (
    <div className={classes.content}>
      <div className={classes.sidebar_head}>
        <BsArrowLeftShort className={classes.close_icon} onClick={handleCloseSidebar} />
        <h1>
          { locale === 'ar-DZ' ? 'خيارات التصفية' : locale === 'fr-FR' ? 'Options de filtrage' : 'Filter options' }
        </h1>
      </div>
      <div className={classes.main}>
        <div className={classes.content_header}>
          <div className={classes.content_header_text}>
            <h2>
              { locale === 'ar-DZ' ? 'تصفية' : locale === 'fr-FR' ? 'Filtres' : 'Filters' }
            </h2>
            <button onClick={handleClearFiltersEvent}>
              { locale === 'ar-DZ' ? 'تهيئة' : locale === 'fr-FR' ? 'Tout effacer' : 'Clear all'}
            </button>
          </div>
          <FiltersListLabels /> 
        </div>
        <div className={classes.filters}>
          <FilterMenuContent />
        </div>
      </div>
    </div>
  )
}

export default FiltersSidebar