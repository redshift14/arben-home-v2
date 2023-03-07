import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BiPlus, BiMinus } from 'react-icons/bi'

import { useStateContext } from '../../context/stateContext'
import { getOptionNameTranslated, getOptionName } from '../../lib/helpers/filterMenuItemsHandlers'
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

  const showSubMenuAriaLabel = locale == 'ar-DZ' ? 'اخفاء او اظهار خيارات التصفية التابعة' : locale == 'fr-FR' ? 'Afficher ou masquer les options de sous-filtre' : 'Show or hide sub filter options'

  const maxPriceAriaLabel = locale == 'ar-DZ' ? 'أقصى سعر' : locale == 'fr-FR' ? 'Prix max' : 'Max price'

  const minPriceAriaLabel =  locale == 'ar-DZ' ? 'أدنى سعر' : locale == 'fr-FR' ? 'Prix min' : 'Min price'

  return (
    <div className={classes.main}>
      <div className={classes.head}>
        <label>{title}</label>
        <button aria-label={showSubMenuAriaLabel} onClick={() => setOpen(v => v = !v)}>
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
                      aria-label={maxPriceAriaLabel}
                      type='number' 
                      onChange={handleMinPriceInputChange} 
                      value={selectedMinPrice} 
                    />
                    <span>
                      { locale === 'ar-DZ' ? 'إلى' : locale === 'fr-FR' ? 'à' : 'to' }
                    </span>
                    <input 
                      aria-label={minPriceAriaLabel}
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
                  <label className={classes.item} key={option._id}>
                    <input
                      type='checkbox' 
                      value={getOptionName(option, filterName)}
                      name={getOptionNameTranslated(option, filterName, locale)}
                      checked={selectedOptions.includes(getOptionName(option, filterName))}
                      onChange={handleCheckboxChange}
                    />
                    {
                      capitilizeFirstLetter(getOptionNameTranslated(option, filterName, locale))
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