import { client } from '../../lib/client'

import MainDetails from '../../components/productDetails/MainDetails'
import Tabs from '../../components/productDetails/Tabs'
import RelatedProducts from '../../components/productDetails/RelatedProducts'

const ProductDetails = ({ product, relatedProducts }) => {
  
  const { 
    images, name, subtitle, price, quantities, sizes, title, slug, _id, care, description, materialsUsed,
  } = product

  return (
    <div>
      <MainDetails 
        images={images}
        name={name}
        subtitle={subtitle}
        price={price}
        quantities={quantities}
        sizes={sizes}
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
    </div>
  )
}

export default ProductDetails

export const getStaticProps = async ({ params: { slug } }) => {

  const query = `
    *[_type == 'product' && slug.current == '${slug}'][0] {
      _createdAt, _type, images, name, subtitle, price, quantities, sizes, title, slug, 
      _id, care, description, materialsUsed[]->, categories[]->, styles[]->,
    }
  `

  const product = await client.fetch(query)

  const relatedProductsQuery = `
    *[_type == 'product' && '${product.styles[0].styleName.en}' in styles[]->.styleName.en
    && '${product.categories[0].categoryName.en}' in categories[]->.categoryName.en 
    && slug.current != '${slug}'] { _id, name, slug, price, sizes, images}[0..5]
  `

  const relatedProducts = await client.fetch(relatedProductsQuery)

  return {
    props: { product, relatedProducts }
  }
}

export const getStaticPaths = async () => {
  const query = `*[_type == 'product'] { slug { current } }`
  const products = await client.fetch(query)

  const paths = products.map(product => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths, 
    fallback: 'blocking'
  }
}