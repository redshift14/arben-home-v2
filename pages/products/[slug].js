import { client } from '../../lib/client'

import MainDetails from '../../components/productDetails/MainDetails'
import Tabs from '../../components/productDetails/Tabs'

const ProductDetails = ({ product }) => {
  
  return (
    <div>
      <MainDetails product={product} />
      <Tabs product={product} />
    </div>
  )
}

export default ProductDetails

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`

  const product = await client.fetch(query)

  return {
    props: { product }
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