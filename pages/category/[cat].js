import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loading from '../../components/Loading'
import CategoriesHead from '../../html-heads/CategoriesHead'

import { getPageTitle } from '../../lib/helpers/generalFunctions'

// const CategoryPage = dynamic(() => import('../../components/Categories/CategoryPage'), {
//   loading: () => <Loading />
// })

import CategoryPage from '../../components/Categories/CategoryPage'

import { client, fetchDocumentByType } from '../../lib/client'
import { getSortingOptions } from '../../lib/helpers/backendPropsGetters'

const Category = ({ products, cat }) => {

  const { data, error, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  const { locale, asPath } = useRouter()

  const currentCategoryName = getPageTitle(asPath, locale)

  return (
    <>
      {
        isLoading ? ( <Loading />) : 
        <>
          <CategoriesHead locale={locale} cat={currentCategoryName} />
          <CategoryPage 
            products={products} 
            imageData={data.aboutPageShowcaseImage} 
            currentCategoryName={currentCategoryName}
            currentCat={cat} 
            locale={locale}
          />
        </>
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