import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import classes from './CustomSortingSelect.module.css'

const options = [
  {
    id: 1,
    ar: 'الأحدث',
    fr: 'Les plus récent',
    en: 'Newest'
  },
  {
    id: 2,
    ar: 'أبجدياً',
    fr: 'Alphabétiquement',
    en: 'Alphabetically'
  },
  {
    id: 3,
    ar: 'السعر الأعلى الى الأدنى',
    fr: 'Prix : décroissant',
    en: 'Price: high to low'
  },
  {
    id: 4,
    ar: 'السعر الأدنى الى الأعلى',
    fr: 'Prix: ​​croissant',
    en: 'Price: low to high'
  }
]

const CustomSortingSelect = () => {

  const { locale } = useRouter()

  const [showList, setShowList] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedOptionId, setSelectedOptionId] = useState(1)

  useEffect(() => {
    const defaultOption = locale === 'ar-DZ' ? options[0].ar : locale === 'fr-FR' ? options[0].fr : options[0].en
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
              options.map((option) => (
                <li 
                  className={classes.item} 
                  key={option.id} 
                  onClick={() => { 
                    setSelectedOption(locale === 'ar-DZ' ? option.ar : locale === 'fr-FR' ? option.fr : option.en)
                    setShowList(false)
                    setSelectedOptionId(option.id)
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