import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import classes from './CustomSortingSelect.module.css'

const options = [
  {
    id: 'newest',
    ar: 'الأحدث',
    fr: 'Les plus récent',
    en: 'Newest'
  },
  {
    id: 'alphabetically',
    ar: 'أبجدياً',
    fr: 'Alphabétiquement',
    en: 'Alphabetically'
  },
  {
    id: 'priceDecroissant',
    ar: 'السعر الأعلى الى الأدنى',
    fr: 'Prix : décroissant',
    en: 'Price: high to low'
  },
  {
    id: 'priceCroissant',
    ar: 'السعر الأدنى الى الأعلى',
    fr: 'Prix: ​​croissant',
    en: 'Price: low to high'
  }
]

const CustomSortingSelect = ({ categoryPage }) => {

  const { locale, query, asPath } = useRouter()

  const router = useRouter()

  const [showList, setShowList] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

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
                    if (categoryPage) {
                      router.push({ pathname: asPath, query: { ...query, sorting: option.id } })
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