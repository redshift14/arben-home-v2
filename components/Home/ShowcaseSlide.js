import { useRouter } from 'next/router'
import classes from './ShowcaseSlide.module.css'

const ShowcaseSlide = ({ imageSrc, titleText, subtitleText }) => {

  const { locale } = useRouter()

  return (
    <div className={classes.main} style={{ backgroundImage: `url('${imageSrc}')` }}>
      <h1 className={classes.title}>{titleText}</h1>
      <h2 className={classes.subtitle}>{subtitleText}</h2>
      <button className={classes.button}>
        {
          locale == 'fr-FR' ? 'Achetez Maintenant' : locale == 'ar-DZ' ? 'تسوق الآن' : 'Shop Now'
        } 
      </button>
    </div>
  )
}

export default ShowcaseSlide