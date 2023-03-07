import Head from 'next/head'

const SearchProductsHead = ({ locale }) => {
  return (
    <Head>
      {
        locale === 'ar-DZ' ? 
        <>          
          <title>بحث متقدم عن المنتجات</title>
          <meta name='description' content='ابحث عن المنتج الذي تريده من منتجاتنا من خلال عدة خيارات للتصفية' />
          <meta name='keywords' content='تسوق عن بعد, افرشة غرف النوم, قماش السرير, غلاف لحاف, طقم سرير, غرفة نوم, تسوق الكتروني في الجزائر, دفع عند الاستلام' />
        </> :
        locale === 'fr-FR' ? 
        <>          
          <title>Recherche avancée de nos produits</title>
          <meta name='description' content="Recherchez le produit souhaité à l'aide de plusieurs filtres" />
          <meta name='keywords' content='shopping en ligne, draps de lit, linge de chambre, housse de couette, ensembles de lit, chambre à coucher' />
        </> :
        <>          
          <title>Advanced search of our products</title>
          <meta name='description' content='Search you desired product using multiple filters' />
          <meta name='keywords' content='online shopping, algeria online shopping, bed sheets, bedroom linen, quilt cover, bed sets, bedroom, cash on delivery, search for products' />
        </> 
      }
      <meta httpEquiv="Content-Language" content='en, ar, fr' />
      <meta charSet="UTF-8" />
    </Head>
  )
}

export default SearchProductsHead