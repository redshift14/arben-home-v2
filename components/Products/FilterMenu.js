import { useRouter } from 'next/router'

import FilterMenuItem from './FilterMenuItem'
import classes from './FilterMenu.module.css'

import { filters } from './filters'

const FilterMenu = () => {
  
  const { locale } = useRouter()
  
  return (
    <div className={classes.main}>
      <div className={classes.head}>
        <h2>{ locale === 'ar-DZ' ? 'تصفية' : locale === 'fr-FR' ? 'Filtres' : 'Filters' }</h2>
        <button>
          { locale === 'ar-DZ' ? 'تهيئة' : locale === 'fr-FR' ? 'Tout effacer' : 'Clear all'}
        </button>
      </div>
      <div className={classes.content} >
        {
          filters.map(f => (
            <FilterMenuItem key={f.id} title={f.title} filters={f.data} />
          ))
        }
      </div>
    </div>
  )
}

export default FilterMenu