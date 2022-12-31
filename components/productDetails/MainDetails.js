import ImageGallery from 'react-image-gallery'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { BsPlus } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'

import 'react-image-gallery/styles/css/image-gallery.css'

import { useStateContext } from '../../context/stateContext'

import { urlFor } from '../../lib/client'
import classes from './MainDetails.module.css'

const MainDetails = ({ product }) => {

  const { addProductToCart, handleIncreaseQty, handleReduceQty, selectedQuantity } = useStateContext()

  const THRESHOLD = 1000
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

  const { locale } = useRouter()

  const { images, name, subtitle, price, quantity, sizes, title, slug, _id } = product

  const [selectedPrice, setSelectedPrice] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0) 

  // const [selectedQty, setSelectedQty] = useState(1)

  // const handleAddQty = () => {
  //   if (selectedQty <= quantity) {
  //     setSelectedQty(v => v+1)
  //   }
  //   else return
  // }

  // const handleMinusQty = () => {
  //   if (selectedQty > 1) {
  //     setSelectedQty(v => v-1)
  //   }
  //   else return
  // }

  const imagesLinks = images.map((image) => ({
    original: urlFor(image).url(),
    thumbnail: urlFor(image).width(100).url()
  }))

  const available = locale === 'ar-DZ' ? 'متوفر' : locale === 'fr-FR' ? 'En Stock' : 'In Stock'
  const notAvailable = locale === 'ar-DZ' ? 'غير متوفر' : locale === 'fr-FR' ? 'En Rupture de Stock' : 'Out of Stock'
  
  return (
    <div className={classes.main}>
      <div className={classes.image_gallery_container}>
        <ImageGallery 
          items={imagesLinks} 
          thumbnailPosition={windowWidth > THRESHOLD ? 'left' : 'bottom'}
          showPlayButton={false}
        />
      </div>
      <div className={classes.details_container}>
        <p className={classes.state_box}>{quantity > 0 ? available : notAvailable }</p>
        <h2>{locale === 'ar-DZ' ? name.ar : locale === 'fr-FR' ? name.fr : name.en}</h2>
        <h4>
          {locale === 'ar-DZ' ? subtitle.ar : locale === 'fr-FR' ? subtitle.fr : subtitle.en}
        </h4>
        <h3 className={classes.price}>
          {price[selectedPrice]}{locale === 'ar-DZ' ? ' دينار جزائري ' : ' DZD '}
        </h3>
        <div className={classes.sizes_container}>
          {
            sizes.map((size, index) => (
              <div 
                className={index === selectedSize ? `${classes.active} ${classes.size}` : classes.size} 
                key={index} 
                onClick={() => {
                  setSelectedPrice(index)
                  setSelectedSize(index)
                }}
                dir='ltr'
              >
                {size}
              </div>
            ))
          }
        </div>
        <div className={classes.quantity_container}>
          <button className={classes.add} onClick={() => handleIncreaseQty(quantity)}>
            <BsPlus />
          </button>
          <p>{selectedQuantity}</p>
          <button className={classes.minus} onClick={() => handleReduceQty()}>
            <BiMinus />
          </button>
        </div>
        <div className={classes.buttons}>
          <button 
            className={classes.addToCart}
            onClick={() => 
              addProductToCart({id: _id, slug: slug.current, title: title, name: name, maxQty: quantity, image: images[0]}, selectedQuantity, price[selectedPrice], sizes[selectedSize])
            }
          >
            {locale === 'ar-DZ' ? 'أضف إلى السلة' : locale === 'fr-FR' ? 'Ajouter au Panier' : 'Add to Cart'}
          </button>
          <button className={classes.buyNow}>
            {locale === 'ar-DZ' ? 'اشتر الآن' : locale === 'fr-FR' ? 'Acheter Maintenant' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainDetails