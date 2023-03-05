import { useRouter } from 'next/router'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { client } from '../../lib/client'
import classes from './AboutPage.module.css'

import { title, text } from './dummyData'

const AboutPage = ({ data }) => {

  const imageProps = useNextSanityImage(client, data)

  const { locale } = useRouter()

  return (
    <div className={classes.main}>
      <div className='showcase-with-bg-image'>
        <Image 
          {...imageProps} 			
          style={{ width: '100%', height: '100%', objectFit:'cover' }} 
          loader={imageProps.loader}
          alt='bed sheets black and white'
          priority
        />
        <h2>
          {locale == 'ar-DZ' ? 'من نحن؟' : locale == 'fr-FR' ? 'Qui sommes nous?' : 'Who we are?'}
        </h2>
      </div>
      <div className={classes.content}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default AboutPage