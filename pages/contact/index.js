import { client, urlFor } from '../../lib/client'

import ContactForm from '../../components/ContactUs/ContactForm'

const Contact = ({ layoutInfo }) => {
  return (
    <>
      <ContactForm imageSrc={urlFor(layoutInfo.contactPageShowcaseImage).url()} />
    </>
  )
}

export default Contact

export const getStaticProps = async () => {
  const layoutQuery = '*[_type == "layout"]{contactPageShowcaseImage}[0]'

  const layoutInfo = await client.fetch(layoutQuery) 

  return {
    props: { layoutInfo }
  }
}