import { useRouter } from 'next/router'
import Image from 'next/image'
import classes from '../style/404.module.css'

import errorImage from '../public/assets/error.png'

const NotFoundPage = () => {

  const { locale } = useRouter()
  
  const router = useRouter()

  return (
    <div className={classes.main}>
      <Image priority src={errorImage} alt='error 404' /> 
      <h2>
        {
          locale === 'ar-DZ' ? 'يبدو أنك تائه' : locale === 'fr-FR' ? 'On dirait que tu es perdu' : 'Looks like you are lost'
        }
      </h2>
      <h3>
        {
          locale === 'ar-DZ' ? 'لا يمكنا ايجاد الصفحة التي تبحث عنها' : locale === 'fr-FR' ? 'Nous ne trouvons pas la page que vous recherchez' : 'We cannot find the page you are looking for'
        }
      </h3>
      <button onClick={() => router.push('/')}>
        {
          locale == 'ar-DZ' ? 'عودة إلى الرئيسة' : locale == 'fr-FR' ? "Retour à la page d'accueil" : 'Go home'
        }
      </button>
    </div>
  ) 
}

export default NotFoundPage