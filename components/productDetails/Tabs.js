import { useState } from 'react'
import { useRouter } from 'next/router'

import classes from './Tabs.module.css'

import DescriptionTab from './DescriptionTab'
import InfoTab from './InfoTab'

const Tabs = ({ product }) => {

  const { locale } = useRouter()

  const [activeTab, setActiveTab] = useState('description')

  const { care, description, materialsUsed } = product

  return (
    <div className={classes.main}>
      <nav>
        <button 
          onClick={() => setActiveTab('description')} 
          className={activeTab == 'description' ? `${classes.active} ${classes.btn}`:classes.btn}
        >
          {
            locale === 'ar-DZ' ? 'الوصف' : locale === 'fr-FR' ? 'Déscription' : 'Description'
          }
        </button>
        <button 
          onClick={() => setActiveTab('moreInfo')}
          className={activeTab == 'moreInfo' ? `${classes.active} ${classes.btn}`:classes.btn}
        >
          {
            locale === 'ar-DZ' ? 'معلومات أخرى' : locale === 'fr-FR' ? 'Autre Info' : 'Other Info'
          }
        </button>
      </nav>
      <div className={classes.tab}>
        {
          activeTab === 'description' ? 
          <DescriptionTab description={description} /> : 
          <InfoTab care={care} materialsUsed={materialsUsed} />
        }
      </div>
    </div>
  )
}

export default Tabs