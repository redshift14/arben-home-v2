import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { client } from '../../lib/client'
import classes from './AboutPage.module.css'

import { title, text, titleAr, textAr } from './dummyData'

const AboutPage = ({ data, locale }) => {

  const imageProps = useNextSanityImage(client, data)

  return (
    <section className={classes.main}>
      <div className='showcase-with-bg-image'>
        <Image 
          {...imageProps} 			
          style={{ width: '100%', height: '100%', objectFit:'cover' }} 
          loader={imageProps.loader}
          alt='bed sheets black and white'
          sizes='100vw'
          priority
        />
        <h2>
          {locale == 'ar-DZ' ? 'من نحن؟' : locale == 'fr-FR' ? 'Qui sommes nous?' : 'Who we are?'}
        </h2>
      </div>
      <div className={classes.content}>
        <h3>{ locale == 'ar-DZ' ? titleAr : title }</h3>
        <p>{ locale == 'ar-DZ' ? textAr : text }</p>
      </div>
    </section>
  )
}

export default AboutPage