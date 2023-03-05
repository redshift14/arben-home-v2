import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { Suspense } from 'react'

import { fetchDocumentByType } from '../../lib/client'
import Loading from '../../components/Loading'

const FaqsList = dynamic(() => import('../../components/Faq/FaqsList'))

const Faq = () => {

  const { data, error, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  return (
    <>
      {
        error ? ( <div>Failed to fetch the content</div>) : 
        isLoading ? ( <Loading />) : 
        <Suspense fallback={<Loading />}>
          <FaqsList data={data.faqPage} />
        </Suspense>
      }
    </>
  )
}

export default Faq