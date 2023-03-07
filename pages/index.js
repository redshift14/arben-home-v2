import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import HomeHead from '../html-heads/HomeHead'
import Loading from '../components/Loading'

import Showcase from '../components/Home/Showcase'

const Intro = dynamic(() => import('../components/Home/Intro'), {
  loading: () => <Loading />
})
const RecentProducts = dynamic(() => import('../components/Home/RecentProducts'), {
  loading: () => <Loading />
})
const Categories = dynamic(() => import('../components/Home/Categories'), {
  loading: () => <Loading />
})
const AboutSection = dynamic(() => import('../components/Home/AboutSection'), {
  loading: () => <Loading />
})

import { client, fetchDocumentByType } from '../lib/client'

const Home = ({ products }) => {
  
  const { data, error, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  const { locale } = useRouter()
  
  return (
    <>
      <HomeHead locale={locale} />
      {
        isLoading ? ( <Loading />) : 
        <>
          <Showcase data={data.homePage.headerSection} locale={locale} />
          <Intro data={data.homePage.introSection} locale={locale} />
          <RecentProducts products={products} locale={locale} />
          <Categories data={data.homePage.categoriesSection} locale={locale} />
          <AboutSection data={data.homePage.aboutSectionText} locale={locale} />
        </>
      }
    </>
  )
}

export default Home

export const getStaticProps = async () => {

  const productsQuery = '*[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt desc) { _id, name, slug, models, images }[0..5]'
  const products = await client.fetch(productsQuery)

  return {
    props: { products },
    revalidate: 10
  }
}