import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { Suspense } from 'react'

import { fetchDocumentByType } from '../../lib/client'
import Loading from '../../components/Loading'

const ContactForm = dynamic(() => import('../../components/ContactUs/ContactForm'))

const Contact = () => {

  const { data, error, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  return (
    <>
      {
        error ? ( <div>Failed to fetch the content</div>) : 
        isLoading ? ( <Loading />) : 
        <Suspense fallback={<Loading />}>
          <ContactForm imageData={data.contactPageShowcaseImage} />
        </Suspense>
      }
    </>
  )
}

export default Contact