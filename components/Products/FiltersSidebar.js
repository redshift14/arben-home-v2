import { slide as Menu } from 'react-burger-menu'
import { useRouter } from 'next/router'

import { HiOutlineFilter } from 'react-icons/hi' 
import { BsArrowLeftShort } from 'react-icons/bs'

import classes from './FiltersSidebar.module.css'

import FilterMenuItem from './FilterMenuItem'
import { filters } from './filters'

const FiltersSidebar = () => {

  const { locale } = useRouter()

  return (
    <Menu
      className={classes.menu}
      customBurgerIcon={<HiOutlineFilter />}
      burgerButtonClassName={classes.burger_icon}
      customCrossIcon={<BsArrowLeftShort />}
      crossButtonClassName={classes.close_icon}
      overlayClassName={classes.overlay}
    >
      <div className={classes.content}>
        <div className={classes.head}>
          <h1>
            { locale === 'ar-DZ' ? 'خيارات التصفية' : locale === 'fr-FR' ? 'Options de filtrage' : 'Filter options' }
          </h1>
        </div>
        <div className={classes.main}>
          <div className={classes.content_header}>
            <h2>
              { locale === 'ar-DZ' ? 'تصفية' : locale === 'fr-FR' ? 'Filtres' : 'Filters' }
            </h2>
            <button>
              { locale === 'ar-DZ' ? 'تهيئة' : locale === 'fr-FR' ? 'Tout effacer' : 'Clear all'}
            </button>
          </div>
          <div className={classes.filters}>
            {      
              filters.map(f => (
                <FilterMenuItem key={f.id} title={f.title} filters={f.data} />
              ))
            }
          </div>
        </div>
      </div>
    </Menu>
  )
}

export default FiltersSidebar