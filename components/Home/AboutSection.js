import classes from './AboutSection.module.css'

const AboutSection = ({ data, locale }) => {

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