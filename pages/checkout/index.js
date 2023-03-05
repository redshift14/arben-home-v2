import useSWR from 'swr'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { fetchDocumentByType } from '../../lib/client'
import Loading from '../../components/Loading'

const MainLayout = dynamic(() => import('../../components/Checkout/MainLayout'), {
  loading: () => <Loading />
})

const Checkout = () => {

  const { data, error, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  return (
    <>
      {
        error ? ( <div>Failed to fetch the content</div>) : 
        isLoading ? ( <Loading />) : 
        <Suspense fallback={<Loading />}>
          <MainLayout 
            imageInfo={data.checkoutPageShowcaseImage}  
            deliveryNotes={data.deliveryNotes}
          />
        </Suspense>
      }
    </>
  )
}

export default Checkout