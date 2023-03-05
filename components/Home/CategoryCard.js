import Link from 'next/link'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import { client } from '../../lib/client'
import classes from './Categories.module.css'

const CategoryCard = ({ bgImage, title, wide, to, titleEn }) => {

  const imageProps = useNextSanityImage(client, bgImage)

  return (
    <Link href={to} style={{ width: '100%' }} className={wide ? classes.wide : ''}>
      <div className={classes.card}>
        <Image 
          {...imageProps} 			
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          loader={imageProps.loader}
          alt={`${titleEn} describing image`}
          priority
        />
        <h3>{title}</h3>
      </div>
    </Link>
  )
}

export default CategoryCard