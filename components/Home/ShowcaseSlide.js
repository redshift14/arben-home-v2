import { useRouter } from 'next/router'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { client } from '../../lib/client'
import classes from './ShowcaseSlide.module.css'

const ShowcaseSlide = ({ image, titleText, subtitleText, isButton, buttonText }) => {

  const router = useRouter()

  const imageProps = useNextSanityImage(client, image)

  return (
    <section className={classes.main}>
      <Image 
        {...imageProps} 			
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        loader={imageProps.loader}
        alt='showcase image of bed sheets'
        sizes='100vw'
        priority
      />
      <div className={classes.content}>
        <h1 className={classes.title}>{titleText}</h1>
        <h2 className={classes.subtitle}>{subtitleText}</h2>
        {
          isButton &&
          <button className={classes.button} onClick={() => router.push('/products')}>
            { buttonText } 
          </button>
        }
      </div>
    </section>
  )
}

export default ShowcaseSlide