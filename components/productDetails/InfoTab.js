import { useRouter } from 'next/router'

import classes from './Tabs.module.css'

const InfoTab = ({ care, materialsUsed }) => {

  const { locale } = useRouter()

  return (
    <div className={classes.info_container}>
      lorem
    </div>
  )
}

export default InfoTab