import dynamic from 'next/dynamic'
import { client } from '../../lib/client'
import { Suspense } from 'react'

import Loading from '../../components/Loading'

const MainDetails = dynamic(() => import('../../components/productDetails/MainDetails'), {
  loading: () => <Loading />
})
const RelatedProducts = dynamic(() => import('../../components/productDetails/RelatedProducts'), {
  loading: () => <Loading />
})
const Tabs = dynamic(() => import('../../components/productDetails/Tabs'), {
  loading: () => <Loading />
})

const ProductDetails = ({ product, relatedProducts }) => {
  
  const { 
    images, name, subtitle, models, title, slug, _id, care, description, materialsUsed, styles, colors, categories
  } = product

  return (
    <Suspense fallback={<Loading />}>
      <MainDetails 
        styles={styles}
        colors={colors}
        categories={categories}
        materialsUsed={materialsUsed}
        care={care} 
        images={images}
        name={name}
        subtitle={subtitle}
        models={models}
        title={title}
        slug={slug}
        _id={_id} 
      />
      <Tabs
        care={care} 
        description={description}
        materialsUsed={materialsUsed}
      />
      <RelatedProducts
        products={relatedProducts}
      />
    </Suspense>
  )
}

export default ProductDetails

export const getServerSideProps = async (context) => {

  context.res.setHeader('Cache-control', 's-maxage=20, stale-while-revalidate=60' )

  const { params } = context

  const { slug } = params

  const productQuery = `
    *[_type == 'product' && slug.current == '${slug}'][0] {
      _createdAt, _type, images, name, subtitle, models, title, slug, 
      _id, care, description, materialsUsed[]->, categories[]->, styles[]->, colors[]->
    }
  `

  const product = await client.fetch(productQuery)

  const relatedProductsQuery = `
    *[_type == 'product' && !(_id in path("drafts.**")) && '${product.styles[0].styleName.en}' in styles[]->.styleName.en
    && '${product.categories[0].categoryName.en}' in categories[]->.categoryName.en 
    && slug.current != '${slug}'] { _id, name, slug, models, images}[0..5]
  `

  const relatedProducts = await client.fetch(relatedProductsQuery)

  return {
    props: { product, relatedProducts }
  }
}