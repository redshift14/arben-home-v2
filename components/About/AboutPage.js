import { useRouter } from 'next/router'
import classes from './AboutPage.module.css'

import { title, text } from './dummyData'

const AboutPage = ({ imageSrc }) => {

  const { locale } = useRouter()

  return (
    <div className={classes.main}>
      <div className={classes.showcase_container} style={{ backgroundImage: `url('${imageSrc}')` }}>
        <h2>{ locale == 'ar-DZ' ? 'من نخن؟' : locale == 'fr-FR' ? 'Contactez-nous?' : 'Who we are?'}</h2>
      </div>
      <div className={classes.content}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default AboutPage