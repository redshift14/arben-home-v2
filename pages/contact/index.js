import { client, urlFor } from '../../lib/client'

import ContactForm from '../../components/ContactUs/ContactForm'

const Contact = ({ layoutInfo }) => {
  return (
    <>
      <ContactForm imageSrc={urlFor(layoutInfo.otherPagesShowcaseImage).url()} />
    </>
  )
}

export default Contact

export const getServerSideProps = async () => {
  const layoutQuery = '*[_type == "layout"]{otherPagesShowcaseImage}[0]'

  const layoutInfo = await client.fetch(layoutQuery) 

  return {
    props: { layoutInfo }
  }
}