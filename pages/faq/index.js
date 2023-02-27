import { client, urlFor } from '../../lib/client'

import FaqsList from '../../components/Faq/FaqsList'

const Faq = ({ layoutInfo }) => {

  console.log(layoutInfo)

  return (
    <FaqsList
      data={layoutInfo.faqPage.questionsAndAnswers}
      imageSrc={urlFor(layoutInfo.faqPage.showcaseImage).url()}
    />
  )
}

export default Faq

export const getServerSideProps = async () => {
  const layoutQuery = '*[_type == "layout"]{faqPage}[0]'

  const layoutInfo = await client.fetch(layoutQuery) 

  return {
    props: { layoutInfo }
  }
}