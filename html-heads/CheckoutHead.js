import Head from 'next/head'

const CheckoutHead = ({ locale }) => {
  return (
    <Head>
      {
        locale === 'ar-DZ' ? 
        <>          
          <title>الدفع والتوصيل</title>
          <meta name='description' content='صفحة ادخال خيارات الدفع والتسليم' />
        </> :
        locale === 'fr-FR' ? 
        <>          
          <title>Le paiement</title>
          <meta name='description' content="page de paiement pour entrer l'adresse de facturation et le mode de livraison" />
        </> :
        <>          
          <title>Checkout</title>
          <meta name='description' content='checkout page to enter billing address and delivery method' />
        </> 
      }
      <meta httpEquiv="Content-Language" content='en, ar, fr' />
      <meta charSet="UTF-8" />
    </Head>
  )
}

export default CheckoutHead