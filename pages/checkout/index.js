import { client, urlFor } from '../../lib/client'
import MainLayout from '../../components/Checkout/MainLayout'

const Checkout = ({ layoutInfo }) => {
  return (
    <>
      <MainLayout 
        imageSrc={urlFor(layoutInfo.checkoutPageShowcaseImage).url()}  
        deliveryNotes={layoutInfo.deliveryNotes}
      />
    </>
  )
}

export default Checkout

export const getStaticProps = async () => {
  const layoutQuery = '*[_type == "layout"]{checkoutPageShowcaseImage, deliveryNotes}[0]'

  const layoutInfo = await client.fetch(layoutQuery) 

  return {
    props: { layoutInfo }
  }
}