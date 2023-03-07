import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetchDocumentByType } from '../../lib/client'
import Loading from '../../components/Loading'

import MainLayout from '../../components/Checkout/MainLayout'
import CheckoutHead from '../../html-heads/CheckoutHead'

const Checkout = () => {

  const { data, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  const { locale } = useRouter()

  return (
    <>
      {
        isLoading ? ( <Loading />) : 
        <>
          <CheckoutHead locale={locale} />
          <MainLayout 
            imageInfo={data.checkoutPageShowcaseImage}  
            deliveryNotes={data.deliveryNotes}
          />
        </>
      }
    </>
  )
}

export default Checkout