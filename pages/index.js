import Showcase from '../components/Home/Showcase'
import Intro from '../components/Home/Intro'
import RecentProducts from '../components/Home/RecentProducts'
import Categories from '../components/Home/Categories'
import AboutSection from '../components/Home/AboutSection'

import { client } from '../lib/client'

const Home = ({ products, layoutInfo }) => {

  const { aboutSectionText, categoriesSection, headerSection, introSection } = layoutInfo.homePage
  
  return (
    <>
      <Showcase data={headerSection} />
      <Intro data={introSection} />
      <RecentProducts products={products} />
      <Categories data={categoriesSection} />
      <AboutSection data={aboutSectionText} />
    </>
  )
}

export default Home

export const getServerSideProps = async () => {

  const layoutQuery = '*[_type == "layout"][0]'

  const layoutInfo = await client.fetch(layoutQuery) 

  const productsQuery = '*[_type == "product"] | order(_createdAt desc) { _id, name, slug, price, sizes, images }[0..5]'
  const products = await client.fetch(productsQuery)

  return {
    props: { products, layoutInfo }
  }
}