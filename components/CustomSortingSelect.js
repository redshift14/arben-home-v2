import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { sortingOptions } from '../lib/data/sortingOptions'
import classes from '../style/CustomSortingSelect.module.css'

const CustomSortingSelect = ({ categoryPage, currentCat }) => {

  const { locale, query } = useRouter()

  const router = useRouter()

  const [showList, setShowList] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  useEffect(() => {
    const defaultOption = locale === 'ar-DZ' ? sortingOptions[0].ar : locale === 'fr-FR' ? sortingOptions[0].fr : sortingOptions[0].en
    setSelectedOption(defaultOption)
  }, [ locale ])

  return (
    <div className={classes.main}>
      <button className={classes.select} onClick={() => setShowList(v => !v)}>
        <div className={classes.content}>
          <p>
            { selectedOption }
          </p>
        </div>
        <div className={ locale === 'ar-DZ' ? `${classes.arrows} ${classes.arrows_ar}` : classes.arrows }></div>
      </button>
      {
        showList && (
          <ul className={classes.list}> 
            {
              sortingOptions.map((option) => (
                <li 
                  className={classes.item} 
                  key={option.id} 
                  onClick={() => { 
                    setSelectedOption(locale === 'ar-DZ' ? option.ar : locale === 'fr-FR' ? option.fr : option.en)
                    setShowList(false)
                    if (categoryPage) {
                      router.push({ pathname: `/category/${currentCat}`, query: { sorting: option.id } })
                    } else {
                      router.push({ pathname: '/products', query: { ...query, sorting: option.id } })
                    }
                  }}
                >
                  {
                    locale === 'ar-DZ' ? option.ar : locale === 'fr-FR' ? option.fr : option.en
                  }
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}

export default CustomSortingSelect