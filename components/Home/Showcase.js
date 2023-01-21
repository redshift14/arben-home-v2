import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { useRef } from 'react'
import { useRouter } from 'next/router'

import { urlFor } from '../../lib/client'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import arrowIcon from '../../public/assets/icons/arrow.png'

import ShowcaseSlide from './ShowcaseSlide'
import classes from './Showcase.module.css'

const Showcase = ({ data }) => {

  const { locale } = useRouter()

  const swiperPrevRef = useRef(null)
  const swiperNextRef = useRef(null)

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={true}
      navigation={{
        prevEl: swiperPrevRef.current,
        nextEl: swiperNextRef.current
      }}
      className={classes.swiperWrapper}
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = swiperPrevRef.current
        swiper.params.navigation.nextEl = swiperNextRef.current
        swiper.navigation.init()
        swiper.navigation.update()
      }}
      dir='ltr'
    >
      {
        data.map(slideInfo => {
          const { _key, coverImage, mainText, secondaryText, } = slideInfo
          return (
            <SwiperSlide key={_key}>
              <ShowcaseSlide 
                imageSrc={urlFor(coverImage).url()} 
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
              />
            </SwiperSlide>
          )
        })
      }
      <div className={classes.swiperNavPrev} ref={swiperPrevRef} style={{ backgroundImage: `url(${arrowIcon.src})` }}></div>
      <div className={classes.swiperNavNext} ref={swiperNextRef} style={{ backgroundImage: `url(${arrowIcon.src})` }}></div>
    </Swiper>
  )
}

export default Showcase