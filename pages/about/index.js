import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { Suspense } from 'react'

import { fetchDocumentByType } from '../../lib/client'
import Loading from '../../components/Loading'

const AboutPage = dynamic(() => import('../../components/About/AboutPage'))

const About = () => {

  const { data, error, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  return (
    <>    
      {
        error ? ( <div>Failed to fetch the content</div>) : 
        isLoading ? ( <Loading />) : 
        <Suspense fallback={<Loading />}>
          <AboutPage data={data.aboutPageShowcaseImage} />
        </Suspense>
      }
    </>
  )
}

export default About