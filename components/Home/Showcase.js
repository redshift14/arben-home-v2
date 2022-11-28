import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { useRef } from 'react'
import { useRouter } from 'next/router'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import Image1 from '../../public/assets/showcase1.jpg'
import Image2 from '../../public/assets/showcase2.jpg'
import arrowIcon from '../../public/assets/icons/arrow.png'

import ShowcaseSlide from './ShowcaseSlide'
import classes from './Showcase.module.css'

const Showcase = () => {

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
      <SwiperSlide>
        <ShowcaseSlide 
          imageSrc={Image1.src} 
          titleText={
            locale == 'fr-FR' ? 'Linge de Chambre et de Cuisine' : 
            locale == 'ar-DZ' ? 'أفرشة غرف النوم والمطبخ' :
            'Bedroom And Kitchen Linen'
          }
          subtitleText={
            locale == 'fr-FR' ? 'Linge fait main de qualité supérieure' : 
            locale == 'ar-DZ' ? 'كتان عالي الجودة مصنوع يدويًا' :
            'Top quality handmade linen'
          }
        />
      </SwiperSlide>
      <SwiperSlide>
        <ShowcaseSlide 
          imageSrc={Image2.src} 
          titleText={
            locale == 'fr-FR' ? 'Linge de Chambre et de Cuisine' : 
            locale == 'ar-DZ' ? 'أفرشة غرف النوم والمطبخ' :
            'Bedroom And Kitchen Linen'
          }
          subtitleText={
            locale == 'fr-FR' ? 'Linge fait main de qualité supérieure' : 
            locale == 'ar-DZ' ? 'كتان عالي الجودة مصنوع يدويًا' :
            'Top quality handmade linen'
          }
        />
      </SwiperSlide>
      <div className={classes.swiperNavPrev} ref={swiperPrevRef} style={{ backgroundImage: `url(${arrowIcon.src})` }}></div>
      <div className={classes.swiperNavNext} ref={swiperNextRef} style={{ backgroundImage: `url(${arrowIcon.src})` }}></div>
    </Swiper>
  )
}

export default Showcase