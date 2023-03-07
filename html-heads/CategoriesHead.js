import Head from 'next/head'

const CategoriesHead = ({ locale, cat }) => {
  return (
    <Head>
      {
        locale === 'ar-DZ' ? 
        <>          
          <title>{`تصفحوا كل منتجاتنا من صنف ${cat}`}</title>
          <meta name='description' content={`استعراض كل منتجاتنا من صنف ${cat}`} />
          <meta name='keywords' content='تسوق عن بعد, افرشة غرف النوم, قماش السرير, غلاف لحاف, طقم سرير, غرفة نوم, تسوق الكتروني في الجزائر, دفع عند الاستلام' />
        </> :
        locale === 'fr-FR' ? 
        <>          
          <title>{`Parcourez tous nos produits de ${cat}`}</title>
          <meta name='description' content='Parcourez notre large sélection de linge de chambre pour trouver une large sélection de produits de haute qualité' />
          <meta name='keywords' content='shopping en ligne, draps de lit, linge de chambre, housse de couette, ensembles de lit, chambre à coucher' />
        </> :
        <>          
          <title>{`Browse all our products of ${cat}`}</title>
          <meta name='description' content={`Browsing prdoucts of type ${cat}`} />
          <meta name='keywords' content='online shopping, algeria online shopping, bed sheets, bedroom linen, quilt cover, bed sets, bedroom, cash on delivery' />
        </> 
      }
      <meta httpEquiv="Content-Language" content='en, ar, fr' />
      <meta charSet="UTF-8" />
    </Head>
  )
}

export default CategoriesHead