import { useEffect } from 'react'

import MainPage from '../../components/Products/MainPage'

import { useStateContext } from '../../context/stateContext'

import { client } from '../../lib/client'

const Products = ({ products, allCategories, allColors, allMaterials, allStyles, test }) => {

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

  return (
    <>
      <MainPage />
    </>
  )
}

export default Products

export const getServerSideProps = async (context) => {

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

// function to get sorting options from context variable in url
const getSortingOptions = (sorting) => {

  const sortingOption =  sorting === 'alphabetically' ? 'title' : sorting === 'priceDecroissant' ? 'price[0]' : sorting === 'priceCroissant' ? 'price[0]' : '_createdAt'

  let sortingDirection

  if (sorting === 'alphabetically' || sorting === 'priceCroissant') {
    sortingDirection = 'asc'
  }
  else {
    sortingDirection = 'desc'
  }

  return {
    sortingOption, sortingDirection
  }
}

// function to get the inner query for a one type of filter from context variable in url

const getInnerfilterQuery = (filterType, filterName, filterVarName) => {
  const queryVariableArray = filterType ? filterType.split(',') : []

  let loopedQuery = ''
  if (queryVariableArray.length > 0) {
    loopedQuery = queryVariableArray.map(variable => (
      `'${variable}' in ${filterName}[]->.${filterVarName}.en || `
    )).join('').slice(0, -3)
  }

  if (loopedQuery.length > 0) return '(' + loopedQuery + ')'
  else return undefined
}

// function to return the complete filter for all types query from context variable in url

const getMainFilterQuery = (category, color, material, style, sortingOption
  , sortingDirection, minPrice, maxPrice) => {

    let validMinPrice = 1
    let validMaxPrice = 20000
    if (minPrice) validMinPrice = parseInt(minPrice)
    if (maxPrice) validMaxPrice = parseInt(maxPrice)

  return `
    *[_type=='product' 
      ${getInnerfilterQuery(category, 'categories' , 'categoryName') ? 
      '&& ' + getInnerfilterQuery(category, 'categories' , 'categoryName') : ''}
      ${getInnerfilterQuery(color, 'colors' , 'colorName') ? 
      '&& ' + getInnerfilterQuery(color, 'colors' , 'colorName') : ''} 
      ${getInnerfilterQuery(material, 'materialsUsed' , 'materialName') ? 
      '&& ' + getInnerfilterQuery(material, 'materialsUsed' , 'materialName')  : ''} 
      ${getInnerfilterQuery(style, 'styles' , 'styleName') ? 
      '&& ' + getInnerfilterQuery(style, 'styles' , 'styleName') : ''}
      && (price[0] >= ${parseInt(validMinPrice)} && price[0] <= ${parseInt(validMaxPrice)}) 
    ] | order(${sortingOption} ${sortingDirection})
  `
}