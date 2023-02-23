import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { capitilizeFirstLetter } from '../lib/helpers'

const Context = createContext()

export const StateContext = ({ children }) => {

  const router = useRouter()

  const { query, pathname, locale } = router

  ///////////// get filters from backend

  const [allCategories, setAllCategories] = useState([])
  const [allStyles, setAllStyles] = useState([])
  const [allMaterials, setAllMaterials] = useState([])
  const [allColors, setAllColors] = useState([])

  ///////////// filters list 

  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [selectedStyles, setSelectedStyles] = useState([])

  const [selectedAllFiltersWithTranslation, setSelectedAllFiltersWithTranslation] = useState([])
  
  const [selectedConfirmedMinPrice, setSelectedConfirmedMinPrice] = useState(1)
  const [selectedConfirmedMaxPrice, setSelectedConfirmedMaxPrice] = useState(20000)

  const handleFilterOptionsChange = (e, state, setState, filterType) => {

    const index = state.indexOf(e.target.value)
    if (index === -1) {
      if (filterType === 'category') {
        setState([...selectedCategories, e.target.value])
      } 
      else if (filterType === 'color') {
        setState([...selectedColors, e.target.value])
      }
      else if (filterType === 'material') {
        setState([...selectedMaterials, e.target.value])
      }
      else if (filterType === 'style') {
        setState([...selectedStyles, e.target.value])
      }
      setSelectedAllFiltersWithTranslation([...selectedAllFiltersWithTranslation, e.target.name])
    }
    else {
      if (filterType === 'category') {
        setState(selectedCategories.filter(item => item !== e.target.value))
      } 
      else if (filterType === 'color') {
        setState(selectedColors.filter(item => item !== e.target.value))
      }
      else if (filterType === 'material') {
        setState(selectedMaterials.filter(item => item !== e.target.value))
      }
      else if (filterType === 'style') {
        setState(selectedStyles.filter(item => item !== e.target.value))
      }
      setSelectedAllFiltersWithTranslation(selectedAllFiltersWithTranslation.filter(item => item !== e.target.name))
    }
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedMaterials([])
    setSelectedStyles([])
    setSelectedConfirmedMinPrice(1)
    setSelectedConfirmedMaxPrice(20000)
    setSelectedAllFiltersWithTranslation([])
  }

  useEffect(() => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedMaterials([])
    setSelectedStyles([])
    setSelectedConfirmedMinPrice(1)
    setSelectedConfirmedMaxPrice(20000)
    setSelectedAllFiltersWithTranslation([])
  }, [locale])

  useEffect(() => {
    setTimeout(() => {      
      if (pathname == '/products') {
        router.push({
          pathname: '/products', 
          query: {
            ...query,
            category: selectedCategories.length > 0 ? selectedCategories.join(',') : [] ,
            color: selectedColors.length > 0 ? selectedColors.join(',') : [] ,
            material: selectedMaterials.length > 0 ? selectedMaterials.join(',') : [],
            style: selectedStyles.length > 0 ? selectedStyles.join(',') : [] ,
            maxPrice: selectedConfirmedMaxPrice !== 20000 ? selectedConfirmedMaxPrice : [],
            minPrice: selectedConfirmedMinPrice !== 1 ? selectedConfirmedMinPrice : []
          }
        })
      }
    }, 200)
  }, [selectedCategories, selectedColors, selectedMaterials, selectedStyles, selectedConfirmedMinPrice, selectedConfirmedMaxPrice])

  ///////////// products list
  const [productsList, setProductsList] = useState([])

  //////////// cart 
  const [cartItems, setCartItems] = useState([])

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)

  let foundProduct, index

  const addProductToCart = (product, quantity, price, size) => {

    setTotalPrice(prevPrice => prevPrice + price * quantity)
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)

    const checkProductInCartAndSameSize = cartItems.find(item => item.id === product.id && item.size === size)

    if (checkProductInCartAndSameSize) {
      const updatedCartItems = cartItems.map(cartProduct => {
        if (cartProduct.id === product.id) return {
          ...cartProduct, 
          price: price, 
          size: size,
          quantity: quantity
        }
      })
      setCartItems(updatedCartItems)
    }

    else {
      product.price = price
      product.size = size
      product.quantity = quantity
      setCartItems([...cartItems, { ...product }])
    }
  }

  const removeProductFromCart = (product) => {
    foundProduct = cartItems.find(item => item.id+item.size === product.id+product.size)
    const newCartItems = cartItems.filter(item => item.id+item.size !== foundProduct.id+foundProduct.size)

    setTotalPrice(prevPrice => prevPrice - foundProduct.price * foundProduct.quantity)
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)

    setCartItems(newCartItems)
  }

  const toggleQuantityInCartItem = (id, size, value, maxQty) => {
    foundProduct = cartItems.find(item => item.id+item.size === id+size)
    index = cartItems.findIndex(item => item.id+item.size === id+size)

    const newCartItems = cartItems.filter(item => item.id+item.size !== id+size)

    if (value === 'inc') {
      if (foundProduct.quantity < maxQty) {
        
        newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity+1 })
        
        setCartItems(newCartItems)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        setTotalPrice(prevPrice => prevPrice + foundProduct.price)
      }
    }
    else if (value === 'dec') {
      if (foundProduct.quantity > 1) {        
        newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity-1 })
        setCartItems(newCartItems)

        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
        setTotalPrice(prevPrice => prevPrice - foundProduct.price)
      }
    }
  }

  return (
    <Context.Provider
      value={{ cartItems, addProductToCart, removeProductFromCart, toggleQuantityInCartItem, totalPrice, totalQuantities, productsList, setProductsList, selectedCategories, setSelectedCategories, selectedColors, setSelectedColors, selectedMaterials, setSelectedMaterials, selectedStyles, setSelectedStyles, setSelectedConfirmedMaxPrice, selectedConfirmedMaxPrice, setSelectedConfirmedMinPrice, selectedConfirmedMinPrice, handleFilterOptionsChange, handleResetFilters, allCategories, setAllCategories, capitilizeFirstLetter, allColors, setAllColors, allMaterials, setAllMaterials, allStyles, setAllStyles, selectedAllFiltersWithTranslation, setSelectedAllFiltersWithTranslation }}
    >
      { children }
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)