import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import useSWR from 'swr'

const CategoryPage = dynamic(() => import('../../components/Categories/CategoryPage'))

import Loading from '../../components/Loading'

import { client, fetchDocumentByType } from '../../lib/client'
import { getSortingOptions } from '../../lib/helpers/backendPropsGetters'

const Category = ({ products, cat }) => {

  const { data, error, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  return (
    <>
      {
        error ? ( <div>Failed to fetch the content</div>) : 
        isLoading ? ( <Loading />) : 
        <Suspense fallback={<Loading />}>
          <CategoryPage 
            products={products} imageData={data.aboutPageShowcaseImage} currentCat={cat} 
          />
        </Suspense>
      }    
    </>
  )
}

export default Category


export const getServerSideProps = async (context) => {

  context.res.setHeader('Cache-control', 's-maxage=20, stale-while-revalidate=60' )

  const { params, query } = context

  const { cat } = params

  const { sorting } = query

  const { sortingOption, sortingDirection } = getSortingOptions(sorting)

  const productsQuery = `*[_type == "product" && "${cat}" in categories[]->.categoryName.en] | order(${sortingOption} ${sortingDirection}){ _id, name, slug, models, images }`

  const products = await client.fetch(productsQuery)

  return {
    props: { products, cat }
  }
}