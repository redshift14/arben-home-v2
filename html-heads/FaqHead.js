import Head from 'next/head'

const FaqHead = ({ locale }) => {
  return (
    <Head>
      {
        locale === 'ar-DZ' ?
        <>          
          <title>الأسئلة الشائعة</title>
          <meta name='description' content='أجوبة على أسئلة شائعة' />
          <meta name='keywords' content='أسئلة, أجوبة, أسئلة شائعة' />
        </> :
        locale === 'fr-FR' ?
        <>
          <title>Questions fréquemment posées</title>
          <meta name='description' content='Réponses aux questions fréquemment posées' />
          <meta name='keywords' content='questions, réponses, questions fréquentes' />
        </> :
        <>          
          <title>Frequently asked questions</title>
          <meta name='description' content='Answers of frequently asked questions' />
          <meta name='keywords' content='questions, answers, frequent questions' />
        </>
      }
      <meta httpEquiv="Content-Language" content='en, ar, fr' />
      <meta charSet="UTF-8" />
    </Head>
  )
}

export default FaqHead