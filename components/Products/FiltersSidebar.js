import { useState } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { useRouter } from 'next/router'

import { HiOutlineFilter } from 'react-icons/hi' 
import { BsArrowLeftShort } from 'react-icons/bs'

import classes from './FiltersSidebar.module.css'

import { useStateContext } from '../../context/stateContext'

import FiltersListLabels from './FiltersListLabels'
import FilterMenuContent from './FilterMenuContent'

const FiltersSidebar = () => {

  const { locale } = useRouter()

  const { handleResetFilters } = useStateContext()

  const [open, setOpen] = useState(false)

  return (
    <Menu
      className={!open ? `${classes.menu} ${classes.menu_hidden}` : classes.menu}
      customBurgerIcon={<HiOutlineFilter />}
      burgerButtonClassName={locale == 'ar-DZ' ? `${classes.burger_icon} ${classes.burger_icon_ar}` : classes.burger_icon}
      customCrossIcon={<BsArrowLeftShort />}
      crossButtonClassName={locale == 'ar-DZ' ? `${classes.close_icon_ar}` : classes.close_icon}
      overlayClassName={classes.overlay}
      right={locale === 'ar-DZ' ? true : false}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOpen={open}
    >
      <div className={classes.content}>
        <div className={locale == 'ar-DZ' ? `${classes.head} ${classes.head_ar}` : classes.head}>
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
              <button onClick={() => handleResetFilters()}>
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
    </Menu>
  )
}

export default FiltersSidebar