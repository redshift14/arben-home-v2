import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { useRef } from 'react'

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
    >
      <SwiperSlide>
        <ShowcaseSlide 
          imageSrc={Image1.src} 
          titleText={'Bedroom And Kitchen Linen'}
          subtitleText={'Top quality handmade linen'}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ShowcaseSlide 
          imageSrc={Image2.src} 
          titleText={'Lorem ipsum dolor sit amet'}
          subtitleText={'Vestibulum in eleifend lectus, id facilisis augue'}
        />
      </SwiperSlide>
      <div className={classes.swiperNavPrev} ref={swiperPrevRef} style={{ backgroundImage: `url(${arrowIcon.src})` }}></div>
      <div className={classes.swiperNavNext} ref={swiperNextRef} style={{ backgroundImage: `url(${arrowIcon.src})` }}></div>
    </Swiper>
  )
}

export default Showcase