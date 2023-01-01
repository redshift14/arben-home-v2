import { createContext, useContext, useState, useEffect } from 'react'

const Context = createContext()

export const StateContext = ({ children }) => {

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
      value={{ cartItems, addProductToCart, removeProductFromCart, toggleQuantityInCartItem, totalPrice, totalQuantities }}
    >
      { children }
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)