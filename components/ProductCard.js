import Link from 'next/link'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'

import { client } from '../lib/client'
import { useNextSanityImage } from 'next-sanity-image'

import classes from './ProductCard.module.css'

const ProductCard = ({ title, slug, startingPrice, sizes, coverImage, searchPage }) => {

  const imageProps = useNextSanityImage(client, coverImage)

  const { locale } = useRouter()

  return (
    <Link href={`/products/${slug.current}`}>
      <div className={searchPage ? `${classes.main} ${classes.main_s}` : classes.main}>
        <Image {...imageProps} alt='cover image'layout='responsive' objectFit='cover' className={classes.image} />
        <div 
          className={searchPage ? `${classes.content} ${classes.content_s}` : classes.content}
        >
          <p className={searchPage ? `${classes.title} ${classes.title_s}` : classes.title}>
            {title}
          </p>
          <p className={searchPage ? `${classes.price} ${classes.price_s}` : classes.price}>
            {locale == 'fr-FR' ? 'à partir de ' : locale == 'ar-DZ' ? ' ابتداءً من ' : 'from '}{startingPrice}
            {locale == 'ar-DZ' ? ' دينار جزائري ' : ' DZD '} 
          </p>
          <div className={searchPage ? `${classes.sizes} ${classes.sizes_s}` : classes.sizes}>
            {
              sizes.map((s, index) => (
                <p 
                  dir='ltr'
                  className={searchPage ? `${classes.size} ${classes.size_s}` : classes.size} 
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