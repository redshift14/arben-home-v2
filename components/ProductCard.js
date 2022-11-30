import Link from 'next/link'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'

import { client } from '../lib/client'
import { useNextSanityImage } from 'next-sanity-image'

import classes from './ProductCard.module.css'

const ProductCard = ({ title, startingPrice, sizes, coverImage }) => {

  const imageProps = useNextSanityImage(client, coverImage)

  const { locale } = useRouter()

  return (
    <Link href={'/'}>
      <div className={classes.main}>
        <Image {...imageProps} alt='cover image'layout='responsive' objectFit='cover' className={classes.image} />
        <div className={classes.content}>
          <p className={classes.title}>{title}</p>
          <p className={classes.price}>
            {locale == 'fr-FR' ? 'à partir de ' : locale == 'ar-DZ' ? ' ابتداءً من ' : 'from '}{startingPrice}$
          </p>
          <div className={classes.sizes}>
            {
              sizes.map((s, index) => (
                <p dir='ltr' className={classes.size} key={index}>{s}</p>
              ))
            }
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard