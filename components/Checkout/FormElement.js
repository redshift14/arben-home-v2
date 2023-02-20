import classes from './FormElement.module.css'

const FormElement = ({ 
  textarea, value, children, isWide, labelText, errorMessage, onChange, name, id, type, error, ...inputProps
}) => {

  return (
    <div className={isWide ? `${classes.main} ${classes.main_wide}` : classes.main}>
      <label htmlFor={name}>{labelText}</label>
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
        error && <span className={classes.errorMessage}>{errorMessage}</span>
      }
    </div>
  )
}

export default FormElement