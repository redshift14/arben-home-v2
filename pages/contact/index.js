import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetchDocumentByType } from '../../lib/client'
import Loading from '../../components/Loading'

const ContactForm = dynamic(() => import('../../components/ContactUs/ContactForm'))

const Contact = () => {

  const { data, error, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  const { locale } = useRouter()

  return (
    <>
      {
        isLoading ? ( <Loading />) : 
        <>
          <ContactForm imageData={data.contactPageShowcaseImage} locale={locale} />
        </>
      }
    </>
  )
}

export default Contact