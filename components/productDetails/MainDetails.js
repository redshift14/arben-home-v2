import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { BsPlus } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'

import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

import { useStateContext } from '../../context/stateContext'
import { urlFor } from '../../lib/client'

import OtherInfo from './OtherInfo'

import classes from './MainDetails.module.css'

const MainDetails = ({ images, name, subtitle, models, title, slug, _id, styles, colors, categories, materialsUsed, care }) => {

  const { addProductToCart } = useStateContext()

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

  const sizes = models.map(model => ( model.size))
  const prices = models.map(model => (model.price))
  const quantities = models.map(model => (model.quantity))
  const modelsKeys = models.map(model => (model._key)) 

  const [selectedPrice, setSelectedPrice] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0) 
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [selectedKey, setSelectedKey] = useState(modelsKeys[0])

  const [maxQuantity, setMaxQuantity] = useState(0)

  const handleIncreaseQty = () => {
    if (selectedQuantity < quantities[maxQuantity]) setSelectedQuantity(v => v+1)
    else return
  }

  const handleReduceQty = () => {
    if (selectedQuantity > 1) setSelectedQuantity(v => v-1)
    else return
  }

  useEffect(() => {
    if (selectedQuantity > quantities[maxQuantity]) setSelectedQuantity(quantities[maxQuantity])
  }, [maxQuantity])

  const imagesLinks = images.map((image) => ({
    original: urlFor(image).url(),
    thumbnail: urlFor(image).width(100).url(),
    originalClass: classes.image_item_original
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
        <p className={classes.state_box}>
          { quantities.some(q => q > 0) ? available : notAvailable }
        </p>
        <h2>{locale === 'ar-DZ' ? name.ar : locale === 'fr-FR' ? name.fr : name.en}</h2>
        <h4 className={classes.subtitle}>
          {locale === 'ar-DZ' ? subtitle.ar : locale === 'fr-FR' ? subtitle.fr : subtitle.en}
        </h4>
        <h3 className={classes.price}>
          {prices[selectedPrice]}{locale === 'ar-DZ' ? ' دينار جزائري ' : ' DZD '}
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
                  setMaxQuantity(index)
                  setSelectedKey(modelsKeys[index])
                }}
                dir='ltr'
              >
                {size}
              </div>
            ))
          }
        </div>
        <div className={classes.quantity_button_container}>
          <div className={classes.quantity_container}>
            <button 
              className={locale === 'ar-DZ' ? `${classes.minus} ${classes.minus_ar}` : classes.minus} 
              onClick={handleReduceQty}
            >
              <BiMinus />
            </button>
            <p>{selectedQuantity}</p>
            <button 
              className={locale === 'ar-DZ' ? `${classes.add} ${classes.add_ar}` : classes.add}  
              onClick={handleIncreaseQty}
            >
              <BsPlus />
            </button>
          </div>
          <button 
            className={classes.addToCart}
            onClick={() => 
              addProductToCart({id: _id, slug: slug.current, title: title, name: name, modelKey: selectedKey, maxQty: quantities[maxQuantity], image: images[0]}, selectedQuantity, prices[selectedPrice], sizes[selectedSize])
            }
            disabled={selectedQuantity == 0}
          >
            {locale === 'ar-DZ' ? 'أضف إلى السلة' : locale === 'fr-FR' ? 'Ajouter au Panier' : 'Add to Cart'}
          </button>
        </div>
        <OtherInfo 
          styles={styles} 
          categories={categories} 
          colors={colors}
          materialsUsed={materialsUsed} 
          care={care} 
        />
      </div>
    </div>
  )
}

export default MainDetails