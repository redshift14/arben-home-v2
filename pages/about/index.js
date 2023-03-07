import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetchDocumentByType } from '../../lib/client'
import Loading from '../../components/Loading'

// const AboutPage = dynamic(() => import('../../components/About/AboutPage'))
import AboutPage from '../../components/About/AboutPage'
import AboutHead from '../../html-heads/AboutHead'

const About = () => {

  const { data, error, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  const { locale } = useRouter()

  return (
    <>    
      {
        isLoading ? ( <Loading />) : 
        <>
          <AboutHead locale={locale} />
          <AboutPage data={data.aboutPageShowcaseImage} locale={locale} />
        </>
      }
    </>
  )
}

export default About