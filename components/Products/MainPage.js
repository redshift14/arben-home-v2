import classes from './MainPage.module.css'

import FilterMenu from './FilterMenu'
import ProductsCards from './ProductsCards'

const MainPage = ({ products }) => {
  return (
    <div className={classes.main}>
      <div className={classes.menu_container}>
        <FilterMenu />
      </div>
      <div className={classes.cards_container}>
        <ProductsCards products={products} />
      </div>
    </div>
  )
}

export default MainPage