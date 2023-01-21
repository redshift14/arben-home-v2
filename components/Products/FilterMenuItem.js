import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BiPlus, BiMinus } from 'react-icons/bi'

import { useStateContext } from '../../context/stateContext'
import classes from './FilterMenuItem.module.css'

const FilterMenuItem = ({ title, options, selectedOptions, handleCheckboxChange, filterName }) => {

  const { locale } = useRouter()
  
  const [open, setOpen] = useState(false)

  const priceText = locale === 'ar-DZ' ? 'إلى' : locale === 'fr-FR' ? 'à' : 'to'
  const priceTextMin = locale === 'ar-DZ' ? 'أقل من' : locale === 'fr-FR' ? 'Sous' : 'Under'  
  const priceTextMax = locale === 'ar-DZ' ? 'أكثر من' : locale === 'fr-FR' ? 'Plus de' : 'Over'  

  return (
    <div className={classes.main}>
      <div className={classes.head}>
        <h4>{title}</h4>
        <button onClick={() => setOpen(v => v = !v)}>
          { open ? <BiMinus /> : <BiPlus /> }
        </button>
      </div>
      {
        open && (
          <div className={classes.content}>
            {
              options.map(option => (
                <label 
                  className={classes.item} 
                  key={option.id} 
                >
                  <input 
                    type='checkbox' 
                    value={option.name}
                    checked={selectedOptions.includes(option.name)}
                    onChange={handleCheckboxChange}
                  />
                  {
                    filterName === 'price' && option.minValue === undefined && option.maxValue !== undefined ? `${priceTextMin} ${option.maxValue}` : 
                    filterName === 'price' && option.maxValue === undefined && option.minValue !== undefined ? `${priceTextMax} ${option.minValue}` : 
                    filterName === 'price' && option.minValue !== undefined && option.maxValue !== undefined ? `${option.minValue} ${priceText} ${option.maxValue}` :
                    locale === 'ar-DZ' ? option.ar : locale === 'fr-FR' ? option.fr : option.en 
                  }
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