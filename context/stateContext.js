import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Context = createContext()

export const StateContext = ({ children }) => {

  const router = useRouter()

  const { query } = router

  ///////////// filters list 

  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedPrices, setSelectedPrices] = useState([])
  const [selectedMaterials, setSelectedMaterials] = useState([])

  const handleFilterOptionsChange = (e, state, setState, filterType) => {
    const index = state.indexOf(e.target.value)
    if (index === -1) {
      if (filterType === 'category') {
        setState([...selectedCategories, e.target.value])
      } 
      else if (filterType === 'price') {
        setState([...selectedPrices, e.target.value])
      }
      else if (filterType === 'material') {
        setState([...selectedMaterials, e.target.value])
      }
    }
    else {
      if (filterType === 'category') {
        setState(selectedCategories.filter(item => item !== e.target.value))
      } 
      else if (filterType === 'price') {
        setState(selectedPrices.filter(item => item !== e.target.value))
      }
      else if (filterType === 'material') {
        setState(selectedMaterials.filter(item => item !== e.target.value))
      }
    }
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
    setSelectedMaterials([])
    setSelectedPrices([])
  }

  useEffect(() => {
    setTimeout(() => {      
      // router.push({ 
      //   pathname: '/products', 
      //   query: { 
      //     category: selectedCategories.length > 0 ? selectedCategories.join(',') : [] ,
      //     price: selectedPrices.length > 0 ? selectedPrices.join(',') : [],
      //     material: selectedMaterials.length > 0 ? selectedMaterials.join(',') : []
      //   } 
      // })
    }, 300)
  }, [selectedCategories, selectedPrices, selectedMaterials])

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
      value={{ cartItems, addProductToCart, removeProductFromCart, toggleQuantityInCartItem, totalPrice, totalQuantities, productsList, setProductsList, selectedCategories, setSelectedCategories, selectedMaterials, setSelectedMaterials, selectedPrices, setSelectedPrices, handleFilterOptionsChange, handleResetFilters }}
    >
      { children }
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)