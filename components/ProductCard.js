import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { urlFor } from '../lib/client'

import searchClasses from '../style/productCardStyles/ProductCardSearch.module.css'
import relatedClasses from '../style/productCardStyles/ProductCardRelated.module.css'
import categoryClasses from '../style/productCardStyles/ProductCardCategories.module.css'
import homeClasses from '../style/productCardStyles/ProductCardHome.module.css'

const ProductCard = ({ title, slug, models, coverImage1, coverImage2, searchPage, relatedPage, categoryPage }) => {

  const { main, image_part, content, titleClass, price, state_box, sizesClass, size } = searchPage ? searchClasses : relatedPage ? relatedClasses : categoryPage ? categoryClasses : homeClasses

  const { locale } = useRouter()

  const prices = models.map(model => (
    model.price
  ))

  const sizes = models.map(model => (
    model.size
  ))

  const quantities = models.map(model => ( model.quantity ))

  const available = locale === 'ar-DZ' ? 'متوفر' : locale === 'fr-FR' ? 'En Stock' : 'In Stock'
  const notAvailable = locale === 'ar-DZ' ? 'غير متوفر' : locale === 'fr-FR' ? 'En Rupture de Stock' : 'Out of Stock'
  
  const [image, setImage] = useState(coverImage1)

  return (
    <Link href={`/products/${slug.current}`} style={{ display: 'inline-block' }}>
      <div className={main} dir={locale == 'ar-DZ' ? 'rtl' : 'ltr'}>
        <div 
          className={image_part} 
          style={{ backgroundImage: `url('${urlFor(image).url()}')` }}
          onMouseEnter={() => setImage(coverImage2)}
          onMouseLeave={() => setImage(coverImage1)}
        >
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