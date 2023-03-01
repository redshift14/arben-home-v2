import CategoryPage from '../../components/Categories/CategoryPage'

import { client, urlFor } from '../../lib/client'
import { getSortingOptions } from '../../lib/helpers/backendPropsGetters'

const Category = ({ products, layoutInfo }) => {
  return (
    <CategoryPage 
      products={products} imageSrc={urlFor(layoutInfo.aboutPageShowcaseImage).url()}  
    />
  )
}

export default Category


export const getServerSideProps = async (context) => {

  const layoutQuery = '*[_type == "layout"]{aboutPageShowcaseImage}[0]'

  const layoutInfo = await client.fetch(layoutQuery) 

  const { params, query } = context

  const { cat } = params

  const { sorting } = query

  const { sortingOption, sortingDirection } = getSortingOptions(sorting)

  const productsQuery = `*[_type == "product" && "${cat}" in categories[]->.categoryName.en] | order(${sortingOption} ${sortingDirection}){ _id, name, slug, models, images }[0..5]`

  const products = await client.fetch(productsQuery)

  return {
    props: { products, layoutInfo }
  }
}