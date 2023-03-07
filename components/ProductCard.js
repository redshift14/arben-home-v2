import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { client } from '../lib/client'

import searchClasses from '../style/productCardStyles/ProductCardSearch.module.css'
import relatedClasses from '../style/productCardStyles/ProductCardRelated.module.css'
import categoryClasses from '../style/productCardStyles/ProductCardCategories.module.css'
import homeClasses from '../style/productCardStyles/ProductCardHome.module.css'

const ProductCard = ({ title, slug, models, coverImage1, coverImage2, searchPage, relatedPage, categoryPage, locale }) => {

  const { main, image_part, content, titleClass, price, state_box, sizesClass, size } = searchPage ? searchClasses : relatedPage ? relatedClasses : categoryPage ? categoryClasses : homeClasses

  const prices = models.map(model => (model.price))

  const sizes = models.map(model => (model.size))

  const quantities = models.map(model => ( model.quantity ))

  const available = locale === 'ar-DZ' ? 'متوفر' : locale === 'fr-FR' ? 'En Stock' : 'In Stock'
  const notAvailable = locale === 'ar-DZ' ? 'غير متوفر' : locale === 'fr-FR' ? 'En Rupture de Stock' : 'Out of Stock'
  
  const imageProps1 = useNextSanityImage(client, coverImage1)
  const imageProps2 = useNextSanityImage(client, coverImage2)
  
  const [imageProps, setImageProps] = useState({...imageProps1})

  const handleMouseEnter = () => {
    setImageProps({...imageProps2})
  }
  const handleMouseLeave = () => {
    setImageProps({...imageProps1})
  }

  return (
    <Link href={`/products/${slug.current}`} style={{ display: 'inline-block' }}>
      <div className={main} dir={locale == 'ar-DZ' ? 'rtl' : 'ltr'}>
        <div className={image_part} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image           
            src={imageProps.src}
            width={imageProps.width}	
            height={imageProps.height}
            loader={imageProps.loader}
            sizes={'(max-width: 500) 80vw, (max-width: 1000) 40vw, (max-width: 1920) 30vw, 15'}
            style={{ width: '100%', height: '100%', objectFit:'cover' }} 
            alt={title}
            priority
          />
        </div>
        <div className={content}>
          <p className={state_box}>
            { quantities.some(q => q > 0) ? available : notAvailable }
          </p>
          <p className={titleClass}>{title}</p>
          <p className={price}>
            {locale == 'fr-FR' ? 'à partir de ' : locale == 'ar-DZ' ? ' ابتداءً من ' : 'from '}
            { Math.min(...prices) }
            {locale == 'ar-DZ' ? ' دينار جزائري ' : ' DZD '} 
          </p>
          <div className={sizesClass}>
            {
              sizes.map((s, index) => (
                <p dir='ltr' className={size} key={index}>{s}</p>
              ))
            }
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard