import Head from 'next/head'

const ProductHead = ({ locale, productName, category }) => {
  return (
    <Head>
      {
        locale === 'ar-DZ' ? 
        <>          
          <title>{`${productName.ar}`}</title>
          <meta name='description' content={`${category.categoryName.ar} صنع يدوي نوعية رفيعة`} />
          <meta name='keywords' content='تسوق عن بعد, افرشة غرف النوم, قماش السرير, غلاف لحاف, طقم سرير, غرفة نوم, تسوق الكتروني في الجزائر, دفع عند الاستلام' />
        </> :
        locale === 'fr-FR' ? 
        <>          
          <title>{`${productName.fr}`}</title>
          <meta name='description' content={`${category.categoryName.fr} - fait à la main de haute qualité`} />
          <meta name='keywords' content='shopping en ligne, draps de lit, linge de chambre, housse de couette, ensembles de lit, chambre à coucher' />
        </> :
        <>          
          <title>{`${productName.en}`}</title>
          <meta name='description' content={`${category.categoryName.en} - hand made with high quality`} />
          <meta name='keywords' content='online shopping, algeria online shopping, bed sheets, bedroom linen, quilt cover, bed sets, bedroom, cash on delivery' />
        </> 
      }
      <meta httpEquiv="Content-Language" content='en, ar, fr' />
      <meta charSet="UTF-8" />
    </Head>
  )
}

export default ProductHead