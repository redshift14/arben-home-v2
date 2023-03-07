import Head from 'next/head'

const ContactUsHead = ({ locale }) => {
  return (
    <Head>
      {
        locale === 'ar-DZ' ? 
        <>          
          <title>تواصلوا معنا</title>
          <meta name='description' content='تواصلوا معنا عبر البريد الالكتروني' />
          <meta name='keywords' content='تواصلوا معنا، اتصلوا بنا' />
        </> :
        locale === 'fr-FR' ? 
        <>          
          <title>Contactez-nous</title>
          <meta name='description' content='Contactez-nous via le formulaire e-mail' />
          <meta name='keywords' content='contactez-nous' />
        </> :
        <>          
          <title>Contact us</title>
          <meta name='description' content='Contact us through email form' />
          <meta name='keywords' content='contact us' />
        </> 
      }
      <meta httpEquiv="Content-Language" content='en, ar, fr' />
      <meta charSet="UTF-8" />
    </Head>
  )
}

export default ContactUsHead