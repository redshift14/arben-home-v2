import classes from './ContactForm.module.css'

const FormElement = ({ labelTextAr, labelTextEn, labelTextFr, name, value, onChange, textArea, error, errorMessageAr, errorMessageFr, errorMessageEn, locale }) => {
  return (
    <div className={classes.form_element}>
      <label htmlFor={name}>
        { locale === 'ar-DZ' ? labelTextAr : locale === 'fr-FR' ? labelTextFr : labelTextEn }
      </label>
      {
        textArea ? 
        <textarea id={name} name={name} value={value} onChange={onChange} className={error ? classes.errorInput : ''} /> : 
        <input type='text' id={name} name={name} value={value} onChange={onChange} className={error ? classes.errorInput : ''} />
      }
      {
        error && <span className={classes.errorMessage}>
          { locale === 'ar-DZ' ? errorMessageAr : locale === 'fr-FR' ? errorMessageFr : errorMessageEn }
        </span>
      }
    </div>
  )
}

export default FormElement