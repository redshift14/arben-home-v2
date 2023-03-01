import classes from './FormElement.module.css'

const FormElement = ({ 
  textarea, value, children, isWide, labelTextAr, labelTextFr, labelTextEn, errorMessageAr, errorMessageFr, errorMessageEn, onChange, name, id, type, error, locale, ...inputProps
}) => {

  return (
    <div className={isWide ? `${classes.main} ${classes.main_wide}` : classes.main}>
      <label htmlFor={name}>
        { locale === 'ar-DZ' ? labelTextAr : locale === 'fr-FR' ? labelTextFr : labelTextEn }
      </label>
      {
        children ? children : 
        textarea ? 
        <textarea 
          id={name} name={name} className={error ? classes.errorInput : ''} onChange={onChange}
        /> : 
        <input 
          type={type} id={name} {...inputProps} value={value} name={name} onChange={onChange} className={error ? classes.errorInput : ''} 
        />
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