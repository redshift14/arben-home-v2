import Showcase from '../components/Home/Showcase'
import Intro from '../components/Home/Intro'
import RecentProducts from '../components/Home/RecentProducts'
import Categories from '../components/Home/Categories'
import AboutSection from '../components/Home/AboutSection'

import { client } from '../lib/client'

const Home = ({ products }) => {
  return (
    <>
      <Showcase />
      <Intro />
      <RecentProducts products={products} />
      <Categories />
      <AboutSection />
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]{ _id, name, slug, price, sizes, images }[0..7]'
  const products = await client.fetch(query)

  return {
    props: { products }
  }
}