import Link from 'next/link'
import Image from 'next/legacy/image'

import classes from './ProductCard.module.css'

const ProductCard = ({ title, startingPrice, sizes, coverImage }) => {
  return (
    <Link href={'/'}>
      <div className={classes.main}>
        <Image src={coverImage} alt='cover image' width='100%' height='100%' layout='responsive' objectFit='cover' className={classes.image} />
        <div className={classes.content}>
          <p className={classes.title}>{title}</p>
          <p className={classes.price}>From {startingPrice}$</p>
          <div className={classes.sizes}>
            {
              sizes.map((s, index) => (
                <p className={classes.size} key={index}>{s}</p>
              ))
            }
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard