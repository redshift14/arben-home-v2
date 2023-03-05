import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import Loading from '../components/Loading'

const Showcase = dynamic(() => import('../components/Home/Showcase'))

const Intro = dynamic(() => import('../components/Home/Intro'))
const RecentProducts = dynamic(() => import('../components/Home/RecentProducts'))
const Categories = dynamic(() => import('../components/Home/Categories'))
const AboutSection = dynamic(() => import('../components/Home/AboutSection'))

import { client, fetchDocumentByType } from '../lib/client'

const Home = ({ products }) => {
  
  const { data, error, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  const { locale } = useRouter()
  
  return (
    <>
      {
        error ? ( <div>Failed to fetch the content</div>) : 
        isLoading ? ( <Loading />) : 
        <Suspense fallback={<Loading />}>
          <Showcase data={data.homePage.headerSection} locale={locale} />
          <Intro data={data.homePage.introSection} locale={locale} />
          <RecentProducts products={products} locale={locale} />
          <Categories data={data.homePage.categoriesSection} locale={locale} />
          <AboutSection data={data.homePage.aboutSectionText} locale={locale} />
        </Suspense>
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