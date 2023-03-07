import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetchDocumentByType } from '../../lib/client'
import Loading from '../../components/Loading'
import FaqHead from '../../html-heads/FaqHead'

import FaqsList from '../../components/Faq/FaqsList'

const Faq = () => {

  const { data, isLoading } = useSWR('layout', () => fetchDocumentByType('layout'))

  const { locale } = useRouter()

  return (
    <>
      {
        isLoading ? ( <Loading />) : 
        <>  
          <FaqHead locale={locale} />        
          <FaqsList data={data.faqPage} locale={locale} />
        </>
      }
    </>
  )
}

export default Faq