import { useRouter } from 'next/router'
import classes from './AboutSection.module.css'

const AboutSection = ({ data }) => {

  const { locale } = useRouter()

  return (
    <section className={classes.main}>
      <h3>
        { locale == 'ar-DZ' ? 'اربين هوم' : 'Arben Home' }
      </h3>
      <p>
        { locale == 'ar-DZ' ? data.ar : locale == 'fr-FR' ? data.fr : data.en }
      </p>
    </section>
  )
}

export default AboutSection