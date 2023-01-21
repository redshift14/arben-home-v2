import classes from './MainPage.module.css'

import FilterMenu from './FilterMenu'
import ProductsCards from './ProductsCards'

import { useStateContext } from '../../context/stateContext'

const MainPage = () => {

  const { productsList } = useStateContext()

  return (
    <div className={classes.main}>
      <div className={classes.menu_container}>
        <FilterMenu />
      </div>
      <div className={classes.cards_container}>
        <ProductsCards products={productsList} />
      </div>
    </div>
  )
}

export default MainPage