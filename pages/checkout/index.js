import { client, urlFor } from '../../lib/client'
import MainLayout from '../../components/Checkout/MainLayout'

const Checkout = ({ layoutInfo }) => {

  return (
    <>
      <MainLayout 
        imageSrc={urlFor(layoutInfo.otherPagesShowcaseImage).url()}  
        deliveryNotes={layoutInfo.deliveryNotes}
      />
    </>
  )
}

export default Checkout

export const getServerSideProps = async () => {
  const layoutQuery = '*[_type == "layout"]{otherPagesShowcaseImage, deliveryNotes}[0]'

  const layoutInfo = await client.fetch(layoutQuery) 

  return {
    props: { layoutInfo }
  }
}