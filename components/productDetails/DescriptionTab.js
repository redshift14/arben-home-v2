import { useRouter } from 'next/router'
import BlockContent from '@sanity/block-content-to-react'

import classes from './Tabs.module.css'

const DescriptionTab = ({ description }) => {

  const { locale } = useRouter()

  return (
    <div className={classes.description_container}>
      <BlockContent 
        blocks={ locale === 'ar-DZ' ? description.ar : locale === 'fr-FR' ? description.fr : description.en } 
      />
    </div>
  )
}

export default DescriptionTab