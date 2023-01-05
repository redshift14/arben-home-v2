import { useState } from 'react'
import { useRouter } from 'next/router'
import { BiPlus, BiMinus } from 'react-icons/bi'

import classes from './FilterMenuItem.module.css'

const FilterMenuItem = ({ title, filters }) => {

  const { locale } = useRouter()

  const [open, setOpen] = useState(false)

  return (
    <div className={classes.main}>
      <div className={classes.head}>
        <h4>{ locale === 'ar-DZ' ? title.ar : locale === 'fr-FR' ? title.fr : title.en }</h4>
        <button onClick={() => setOpen(v => v = !v)}>
          {
            open ? <BiMinus /> : <BiPlus />
          }
        </button>
      </div>
      {
        open && (
          <div className={classes.content}>
            {
              filters.map(filter => (
                <label class={classes.item} key={filter.id}>
                  <input type='checkbox' name='checkbox' />
                  { locale === 'ar-DZ' ? filter.ar : 'fr-FR' ? filter.fr : filter.en }
                </label>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default FilterMenuItem