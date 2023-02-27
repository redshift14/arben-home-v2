import { useRouter } from 'next/router'

import FaqsListItem from './FaqsListItem'
import classes from './FaqsList.module.css'

const FaqsList = ({ imageSrc, data }) => {

  const { locale } = useRouter()

  return (
    <div className={classes.main}>
      <div className={classes.showcase_container} style={{ backgroundImage: `url('${imageSrc}')` }}>
        <h2>{ locale == 'ar-DZ' ? 'الأسئلة الشائعة' : locale == 'fr-FR' ? 'Questions fréquemment posées' : 'Frequently asked questions' }</h2>
      </div>
      <div className={classes.items_container}>
        {
          data.map(item => (
            <FaqsListItem 
              key={item._key}
              question={locale === 'ar-DZ' ? item.question.ar : locale === 'fr-FR' ? item.question.fr : item.question.en} 
              answer={locale === 'ar-DZ' ? item.answer.ar : locale === 'fr-FR' ? item.answer.fr : item.answer.en}
            />
          ))
        }
      </div>
    </div>
  )
}

export default FaqsList