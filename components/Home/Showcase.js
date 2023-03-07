import { useState } from 'react'
// import dynamic from 'next/dynamic'

import arrowIcon from '../../public/assets/icons/arrow.png'
import classes from './Showcase.module.css'

import ShowcaseSlide from './ShowcaseSlide'
// const ShowcaseSlide = dynamic(() => import('./ShowcaseSlide'))

const Showcase = ({ data, locale }) => {

  const [activeSlide, setActiveSlide] = useState(0)

  const slidesToShow = (data) => {
    if (data.length === 2) return [...data, ...data]
    else return data
  }

  const totalSlides = slidesToShow(data).length

  const handleNextSlide = () => {
    if (activeSlide < totalSlides - 1) setActiveSlide(prev => prev + 1)
    else setActiveSlide(0)
  }

  const handlePrevSlide = () => {
    if (activeSlide === 0) setActiveSlide(totalSlides-1)
    else setActiveSlide(prev => prev - 1)
  }


  return (
    <div className={classes.main}>
      <div className={classes.slider}>
        <div className={classes.slides}>
          {
            slidesToShow(data).map((slideInfo, index) => {
              const { _key, coverImage, mainText, secondaryText, buttonText, withButton } = slideInfo
              return (
                <div 
                  className={`
                    ${classes.slide} 
                    ${index === activeSlide && classes.active}
                    ${index === activeSlide-1 && classes.prev}
                    ${activeSlide === 0 && index === totalSlides-1 ? classes.prev : ''}
                    ${activeSlide === totalSlides-1 && index === 0 ? classes.next : ''}
                  `} 
                  key={_key+index}
                >
                  <ShowcaseSlide
                    image={coverImage} 
                    titleText={
                      locale == 'fr-FR' ? mainText.fr : 
                      locale == 'ar-DZ' ? mainText.ar :
                      mainText.en
                    }
                    subtitleText={
                      locale == 'fr-FR' ? secondaryText.fr : 
                      locale == 'ar-DZ' ? secondaryText.ar :
                      secondaryText.en
                    }
                    buttonText={ withButton && (
                      locale == 'fr-FR' ? buttonText.fr : 
                      locale == 'ar-DZ' ? buttonText.ar : 
                      buttonText.en  
                    )}
                    isButton={withButton}
                  />
                </div>
              )
            })
          }
        </div>
        <div className={`${classes.arrow} ${classes.arrow_next}`} style={{ backgroundImage: `url(${arrowIcon.src})` }} onClick={handleNextSlide}></div>
        <div style={{ backgroundImage: `url(${arrowIcon.src})` }} className={`${classes.arrow} ${classes.arrow_prev}`} onClick={handlePrevSlide} ></div>
      </div>
    </div>
  )
}

export default Showcase