import Head from 'next/head'

const AboutHead = ({ locale }) => {
  return (
    <Head>
      {
        locale === 'ar-DZ' ? 
        <>          
          <title>اربين هوم - من نحن؟</title>
          <meta name='description' content='من نحن؟ نحن متجر الكتروني مصغر لبيع افرشة غرف النوم مصنوعة يدوياً في الجزائر' />
          <meta name='keywords' content='تسوق عن بعد, افرشة غرف النوم, قماش السرير, غلاف لحاف, طقم سرير, غرفة نوم, تسوق الكتروني في الجزائر, دفع عند الاستلام' />
        </> :
        locale === 'fr-FR' ? 
        <>          
          <title>Arben home - Qui sommes nous?</title>
          <meta name='description' content='Qui sommes nous? nous sommes une boutique en ligne qui vend du linge de chambre fait main en Algérie' />
          <meta name='keywords' content='shopping en ligne, draps de lit, linge de chambre, housse de couette, ensembles de lit, chambre à coucher' />
        </> :
        <>          
          <title>Arben home - Who are we?</title>
          <meta name='description' content='Who are we? we are an online store that sells handmade bedroom linen in Algeria' />
          <meta name='keywords' content='online shopping, algeria online shopping, bed sheets, bedroom linen, quilt cover, bed sets, bedroom, cash on delivery' />
        </> 
      }
      <meta httpEquiv="Content-Language" content='en, ar, fr' />
      <meta charSet="UTF-8" />
    </Head>
  )
}

export default AboutHead