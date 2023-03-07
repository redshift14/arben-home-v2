import Head from 'next/head'

const HomeHead = ({ locale }) => {
  return (
    <Head>
      {
        locale === 'ar-DZ' ? 
        <>          
          <title>اربين هوم - متجر الكتروني مختص ببيع افرشة غرف النوم في الجزائر</title>
          <meta name='description' content='تصفحوا منتجاتنا لتجدوا مختلف الافرشة العصرية ذات الجودة العالية' />
          <meta name='keywords' content='تسوق عن بعد, افرشة غرف النوم, قماش السرير, غلاف لحاف, طقم سرير, غرفة نوم, تسوق الكتروني في الجزائر, دفع عند الاستلام' />
        </> :
        locale === 'fr-FR' ? 
        <>          
          <title>Arben home - Achat en ligne de linge de lit en Algérie</title>
          <meta name='description' content='Parcourez notre large sélection de linge de chambre pour trouver une large sélection de produits de haute qualité' />
          <meta name='keywords' content='shopping en ligne, draps de lit, linge de chambre, housse de couette, ensembles de lit, chambre à coucher' />
        </> :
        <>          
          <title>Arben home - Online shopping for bedroom linen in Algeria</title>
          <meta name='description' content='Browse our wide selection of bedroom linen to find the a wide selection of high quality products' />
          <meta name='keywords' content='online shopping, algeria online shopping, bed sheets, bedroom linen, quilt cover, bed sets, bedroom, cash on delivery' />
        </> 
      }
      <meta httpEquiv="Content-Language" content='en, ar, fr' />
      <meta charSet="UTF-8" />
    </Head>
  )
}

export default HomeHead