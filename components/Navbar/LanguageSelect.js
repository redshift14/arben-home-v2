import classes from './LanguageSelect.module.css'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import enFlag from '../../public/assets/icons/united.svg'
import frFlag from '../../public/assets/icons/france.svg'
import arFlag from '../../public/assets/icons/algeria.svg'

const LanguageSelect = () => {

  const router = useRouter()
  const { locale, locales, pathname, asPath, query } = router

  const [showList, setShowList] = useState(false)

  const [selectedFlag, setSelectedFlag] = useState(enFlag)
  const [selectLang, setSelectedLang] = useState('English - EN')

  return (
    <div className={classes.main}>
      <button className={classes.select} onClick={() => setShowList(v => !v)}>
        <div className={classes.content}>
          <Image src={selectedFlag} alt='selected flag' width={28} height={18} />
          <p>{selectLang}</p>
        </div>
        <div className={classes.arrows}></div>
      </button>
      {
        showList && (
          <ul className={classes.list}>
            <li className={classes.item} onClick={() => {
              setSelectedLang('English - EN')
              setSelectedFlag(enFlag)
              setShowList(false)
              localStorage.setItem('lang', 'test')
              router.push({ pathname, query }, asPath, { locale: 'en-US' })
            }}>
              <Image src={enFlag} alt='enFlag' width={28} height={18}  />
              <p>English - EN</p>
            </li>
            <li className={classes.item} onClick={() => {
              setSelectedLang('Français - FR')
              setSelectedFlag(frFlag)
              setShowList(false)
              router.push({ pathname, query }, asPath, { locale: 'fr-FR' })
            }}>
              <Image src={frFlag} alt='frFlag' width={28} height={18}  />
              <p>Français - FR</p>
            </li>
            <li className={classes.item} onClick={() => {
              setSelectedLang('العربية - AR')
              setSelectedFlag(arFlag)
              setShowList(false)
              router.push({ pathname, query }, asPath, { locale: 'ar-DZ' })
            }}>
              <Image src={arFlag} alt='arFlag' width={28} height={18}  />
              <p>العربية - AR</p>
            </li>
          </ul>
        )
      }
    </div>
  )
}

export default LanguageSelect