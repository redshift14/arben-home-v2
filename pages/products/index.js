import { useEffect } from 'react'
import { useRouter } from 'next/router'

import MainPage from '../../components/Products/MainPage'
import SearchProductsHead from '../../html-heads/SearchProductsHead'

import { useStateContext } from '../../context/stateContext'
import { client } from '../../lib/client'
import { getSortingOptions, getMainFilterQuery } from '../../lib/helpers/backendPropsGetters'

const Products = ({ products, allCategories, allColors, allMaterials, allStyles }) => {

  const { setProductsList, setAllCategories, setAllColors, setAllStyles, setAllMaterials } = useStateContext()

  useEffect(() => {
    setAllCategories(allCategories)
    setAllColors(allColors)
    setAllMaterials(allMaterials)
    setAllStyles(allStyles)
  }, [])
  
  useEffect(() => {
    setProductsList(products)
  }, [products])

  const { locale } = useRouter()

  return (
    <>
      <SearchProductsHead locale={locale} />
      <MainPage />
    </>
  )
}

export default Products

export const getServerSideProps = async (context) => {

  context.res.setHeader('Cache-control', 's-maxage=10, stale-while-revalidate=20' )

  const allCategoriesQuery = '*[_type=="category"]{_id, categoryName}'
  const allColorsQuery = '*[_type=="color"]{_id, colorName}'
  const allMaterialsQuery = '*[_type=="materialUsed"]{_id, materialName}'
  const allStylesQuery = '*[_type=="style"]{_id, styleName}'

  const allCategories = await client.fetch(allCategoriesQuery)
  const allColors = await client.fetch(allColorsQuery)
  const allMaterials = await client.fetch(allMaterialsQuery)
  const allStyles = await client.fetch(allStylesQuery)

  const { query } = context 

  const { sorting, category, color, material, style, maxPrice, minPrice } = query

  const { sortingOption, sortingDirection } = getSortingOptions(sorting)

  const products = await client.fetch(getMainFilterQuery(category, color, material, style, sortingOption, sortingDirection, minPrice, maxPrice))

  return {
    props: { products, allCategories, allColors, allMaterials, allStyles }
  }
}