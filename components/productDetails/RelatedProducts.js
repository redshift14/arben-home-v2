import { useRef, useState, useEffect } from 'react'

import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'

import classes from './RelatedProducts.module.css'

import ProductCard from '../ProductCard'

import arrowIcon from '../../public/assets/icons/arrow.png'

const RelatedProducts = ({ products }) => {

  const { locale } = useRouter()

  const [windowWidth, setWindowWidth] = useState()

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }

  },[windowWidth])

  const swiperPrevRef = useRef(null)
  const swiperNextRef = useRef(null)

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>
        {
          locale == 'ar-DZ' ? 'منتجات ذات صلة' : 
          locale == 'fr-FR' ? 'Produits connexes' : 'Related products'
        }
      </h2>
      <hr className={classes.seperator} />
      <Swiper 
        slidesPerView={
          windowWidth > 3500 ? 6 : 
          windowWidth > 1750 && windowWidth < 3500 ? 5 : 
          windowWidth < 1750 && windowWidth > 1250 ? 4 : 
          windowWidth < 1250 && windowWidth > 850 ? 3 : 
          windowWidth < 850 && windowWidth > 400 ? 2 : 1
        }
        centeredSlides={windowWidth <= 400}
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: swiperPrevRef.current,
          nextEl: swiperNextRef.current
        }}
        className={classes.swiper_main_wrapper}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = swiperPrevRef.current
          swiper.params.navigation.nextEl = swiperNextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
        dir='ltr'
      >
        {
          products.map(product => (
            <SwiperSlide key={product._id} className={classes.swiperSlide}>
              <ProductCard 
                slug={product.slug}
                title={locale == 'fr-FR' ? product.name.fr : locale == 'ar-DZ' ? product.name.ar : product.name.en}
                startingPrice={product.price[0]}
                sizes={product.sizes}
                coverImage1={product.images[0]}
                coverImage2={product.images[1]}
                searchPage={false}
                relatedPage={true}
              />
            </SwiperSlide>
          ))
        }

        <div className={classes.swiperNavPrev} ref={swiperPrevRef} style={{ backgroundImage: `url(${arrowIcon.src})` }}></div>
        <div className={classes.swiperNavNext} ref={swiperNextRef} style={{ backgroundImage: `url(${arrowIcon.src})` }}></div>
      </Swiper>
    </div>
  )
}

export default RelatedProducts