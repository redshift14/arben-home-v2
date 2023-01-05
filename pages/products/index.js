import MainPage from '../../components/Products/MainPage'

import { client } from '../../lib/client'

const Products = ({ products }) => {
  return (
    <>
      <MainPage products={products} />
    </>
  )
}

export default Products

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]{ _id, name, slug, price, sizes, images }[0..7]'
  const products = await client.fetch(query)

  return {
    props: { products }
  }
}