import { useRouter } from 'next/router'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import dynamic from 'next/dynamic'

import { client } from '../../lib/client'
import Loading from '../Loading'

const FaqsListItem = dynamic(() => import('./FaqsListItem'), {
  loading: () => <Loading />
})

import classes from './FaqsList.module.css'

const FaqsList = ({ data }) => {

  const { locale } = useRouter()

  const { showcaseImage, questionsAndAnswers } = data

  const imageProps = useNextSanityImage(client, showcaseImage)

  return (
    <div className={classes.main}>
      <div className='showcase-with-bg-image'>
        <Image 
          {...imageProps} 			
          style={{ width: '100%', height: '100%', objectFit:'cover' }} 
          loader={imageProps.loader}
          alt='bed sheets and pillows black and white'
          priority
        />
        <h2>
          {
            locale == 'ar-DZ' ? 'الأسئلة الشائعة' : locale == 'fr-FR' ? 'Questions fréquemment posées' : 'Frequently asked questions'
          }
        </h2>
      </div>
      <div className={classes.items_container}>
        {
          questionsAndAnswers.map(item => (
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