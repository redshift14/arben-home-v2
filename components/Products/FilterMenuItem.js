import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BiPlus, BiMinus } from 'react-icons/bi'

import { useStateContext } from '../../context/stateContext'
import classes from './FilterMenuItem.module.css'

const FilterMenuItem = ({ title, options, selectedOptions, handleCheckboxChange, filterName, isPriceItem }) => {

  const { locale } = useRouter()

  const { capitilizeFirstLetter, selectedConfirmedMaxPrice, setSelectedConfirmedMaxPrice, setSelectedConfirmedMinPrice, selectedConfirmedMinPrice } = useStateContext()

  const [open, setOpen] = useState(true) 

  const [selectedMinPrice, setSelectedMinPrice] = useState(1)
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(20000)

  useEffect(() => {
    if (selectedConfirmedMinPrice == 1) setSelectedMinPrice(1)
    if (selectedConfirmedMaxPrice == 20000) setSelectedMaxPrice(20000)
  }, [selectedConfirmedMaxPrice, selectedConfirmedMinPrice])

  const minPrice = 1
  const maxPrice = 20000

  const handleMinPriceInputChange = (e) => {
    const value = Math.max(minPrice, Math.min(maxPrice, Number(e.target.value)))
    if (value > selectedMaxPrice) setSelectedMinPrice(selectedMaxPrice)
    else setSelectedMinPrice(value)
  }

  const handleMaxPriceInputChange = (e) => {
    const value = Math.max(minPrice, Math.min(maxPrice, Number(e.target.value)))
    if (value < selectedMinPrice) setSelectedMaxPrice(selectedMinPrice)
    else setSelectedMaxPrice(value)
  }

  const handleConfirmPrices = () => {
    setSelectedConfirmedMaxPrice(selectedMaxPrice)
    setSelectedConfirmedMinPrice(selectedMinPrice)
  }

  const getOptionName = (option) => {
    if (filterName == 'category') return option.categoryName.en
    else if (filterName == 'material') return option.materialName.en
    else if (filterName == 'style') return option.styleName.en
    else if (filterName == 'color') return option.colorName.en
  }

  const getOptionNameTranslated = (option) => {
    if (filterName == 'category') {
      if (locale === 'ar-DZ') return option.categoryName.ar
      else if (locale == 'fr-FR') return option.categoryName.fr
      else return option.categoryName.en
    }
    else if (filterName == 'material') {
      if (locale === 'ar-DZ') return option.materialName.ar
      else if (locale == 'fr-FR') return option.materialName.fr
      else return option.materialName.en
    }
    else if (filterName == 'style') {
      if (locale === 'ar-DZ') return option.styleName.ar
      else if (locale == 'fr-FR') return option.styleName.fr
      else return option.styleName.en
    }
    else if (filterName == 'color') {
      if (locale === 'ar-DZ') return option.colorName.ar
      else if (locale == 'fr-FR') return option.colorName.fr
      else return option.colorName.en
    }
  }

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
              isPriceItem ? (
                <div className={classes.price_filter_container}>
                  <div className={classes.top_part}>
                    <input 
                      type='number' 
                      onChange={handleMinPriceInputChange} 
                      value={selectedMinPrice} 
                    />
                    <span>
                      { locale === 'ar-DZ' ? 'إلى' : locale === 'fr-FR' ? 'à' : 'to' }
                    </span>
                    <input 
                      type='number' 
                      onChange={handleMaxPriceInputChange} 
                      value={selectedMaxPrice} />
                  </div>
                  <button onClick={handleConfirmPrices}>
                    { locale === 'ar-DZ' ? 'تأكيد' : locale === 'fr-FR' ? 'Confirmer' : 'Confirm' }
                  </button>
                </div>
              ) :
              (
                options.map(option => (
                  <label 
                    className={classes.item} 
                    key={option._id} 
                  >
                    <input 
                      type='checkbox' 
                      value={getOptionName(option)}
                      name={getOptionNameTranslated(option)}
                      checked={selectedOptions.includes(getOptionName(option))}
                      onChange={handleCheckboxChange}
                    />
                    {
                      capitilizeFirstLetter(getOptionNameTranslated(option))
                    }
                  </label>
                ))
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default FilterMenuItem