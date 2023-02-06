import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { urlFor } from '../lib/client'

import classes from './ProductCard.module.css'

const ProductCard = ({ title, slug, startingPrice, sizes, coverImage1, coverImage2, searchPage, relatedPage }) => {

  const { locale } = useRouter()

  const [image, setImage] = useState(coverImage1)

  return (
    <Link href={`/products/${slug.current}`} style={{ display: 'inline-block' }}>
      <div 
        className={
          searchPage ? `${classes.main} ${classes.main_s}` : 
          relatedPage ? `${classes.main} ${classes.main_r}` : classes.main
        }
        dir={
          locale == 'ar-DZ' ? 'rtl' : 'ltr'
        }
      >
        <div 
          className={
            searchPage ? `${classes.image_part_search_page} ${classes.image_part}` : 
            relatedPage ? `${classes.image_part_related_page} ${classes.image_part}` : 
            classes.image_part
          } 
          style={{ 
            backgroundImage: `url('${urlFor(image).url()}')`,
          }}
          onMouseEnter={() => setImage(coverImage2)}
          onMouseLeave={() => setImage(coverImage1)}
        >
        </div>
        <div 
          className={
            searchPage ? `${classes.content} ${classes.content_s}` : 
            relatedPage ? `${classes.content} ${classes.content_r}` : 
            classes.content
          }
        >
          <p 
            className={
              searchPage ? `${classes.title} ${classes.title_s}` : 
              relatedPage ? `${classes.title} ${classes.title_r}` : 
              classes.title
            }
          >
            {title}
          </p>
          <p 
            className={
              searchPage ? `${classes.price} ${classes.price_s}` : 
              searchPage ? `${classes.price} ${classes.price_r}` : 
              classes.price
            }
          >
            {locale == 'fr-FR' ? 'à partir de ' : locale == 'ar-DZ' ? ' ابتداءً من ' : 'from '}{startingPrice}
            {locale == 'ar-DZ' ? ' دينار جزائري ' : ' DZD '} 
          </p>
          <div 
            className={
              searchPage ? `${classes.sizes} ${classes.sizes_s}` : 
              relatedPage ? `${classes.sizes} ${classes.sizes_r}` :
              classes.sizes
            }
          >
            {
              sizes.map((s, index) => (
                <p 
                  dir='ltr'
                  className={
                    searchPage ? `${classes.size} ${classes.size_s}` : 
                    relatedPage ? `${classes.size} ${classes.size_r}` : 
                    classes.size
                  } 
                  key={index}
                >
                  {s}
                </p>
              ))
            }
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard