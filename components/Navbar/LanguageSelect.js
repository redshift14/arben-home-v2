import classes from './LanguageSelect.module.css'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import enFlag from '../../public/assets/icons/united.svg'
import frFlag from '../../public/assets/icons/france.svg'
import arFlag from '../../public/assets/icons/algeria.svg'

const LanguageSelect = () => {

  const flags = [enFlag, frFlag, arFlag]

  const router = useRouter()
  const { pathname, asPath, query } = router

  const [showList, setShowList] = useState(false)

  const [selectedFlag, setSelectedFlag] = useState(enFlag)
  const [selectLang, setSelectedLang] = useState('English - EN')
  
  useEffect(() => {
    if (!localStorage.getItem('lang') && !localStorage.getItem('flag')) {
      localStorage.setItem('lang', 'English - EN')
      localStorage.setItem('flag', 0)
    }
    setSelectedLang(localStorage.getItem('lang'))
    setSelectedFlag(flags[localStorage.getItem('flag')])
  }, [flags])

  const handleOptionClick = (langName, flagIndex, selectedLocale) => {
    setSelectedLang(langName)
    setSelectedFlag(flags[flagIndex])
    setShowList(false)
    localStorage.setItem('lang', langName)
    localStorage.setItem('flag', flagIndex)
    router.push({ pathname, query }, asPath, { locale: selectedLocale })
  }

  return (
    <div className={classes.main} dir='ltr'>
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
            <li 
              className={classes.item} 
              onClick={() => handleOptionClick('English - EN', 0, 'en-US')} 
            >
              <Image src={enFlag} alt='enFlag' width={28} height={18}  />
              <p>English - EN</p>
            </li>
            <li 
              className={classes.item} 
              onClick={() =>  handleOptionClick('Français - FR', 1, 'fr-FR')}
            >
              <Image src={frFlag} alt='frFlag' width={28} height={18}  />
              <p>Français - FR</p>
            </li>
            <li 
              className={classes.item} 
              onClick={() =>  handleOptionClick('العربية - AR', 2, 'ar-DZ')}
            >
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