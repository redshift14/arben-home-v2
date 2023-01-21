import { useEffect } from 'react'

import MainPage from '../../components/Products/MainPage'

import { useStateContext } from '../../context/stateContext'

import { client } from '../../lib/client'

const Products = ({ products, testProducts }) => {

  const { setProductsList } = useStateContext()

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

  const { query } = context 

  const { sorting, category, price, material } = query

  const sortingOption =  sorting === 'alphabetically' ? 'title' : sorting === 'priceDecroissant' ? 'price[0]' : sorting === 'priceCroissant' ? 'price[0]' : '_createdAt'

  let sortingDirection

  if (sorting === 'alphabetically' || sorting === 'priceCroissant') {
    sortingDirection = 'asc'
  }
  else {
    sortingDirection = 'desc'
  }

  // const testQuery = `*[_type == 'product' ${contextQueryToSanityQuery(category, 'categories')}] `

  const testQuery = `*[_type == 'product']{materialsUsed[]{materialName }}`

  const testProducts = await client.fetch(testQuery)

  const sanitySortingQuery = `*[_type == 'product'] | order(${sortingOption} ${sortingDirection}) `
  const products = await client.fetch(sanitySortingQuery)

  return {
    props: { products, testProducts }
  }
}

const contextQueryToSanityQuery = (queryVariable, queryType) => {
  const queryVariableArray = queryVariable ? queryVariable.split(',') : []

  let loopedQuery = [] 

  if (queryVariableArray.length > 0) {
    loopedQuery = queryVariableArray.map(variable => {
      if (queryVariableArray.length > 1)  return `'${variable}' in ${queryType} ||`  
      else return `'${variable}' in ${queryType}`
    })
  }

  if (loopedQuery.length === 1) return '&& ' + loopedQuery[0]
  else if (loopedQuery.length > 1) return '&& ' + loopedQuery.join(' ').slice(0, -2)
  else return ''
}