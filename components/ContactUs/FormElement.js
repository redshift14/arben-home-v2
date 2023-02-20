import classes from './ContactForm.module.css'

const FormElement = ({ labelText, name, value, onChange, textArea, error, errorMessage }) => {
  return (
    <div className={classes.form_element}>
      <label htmlFor={name}>{labelText}</label>
      {
        textArea ? 
        <textarea id={name} name={name} value={value} onChange={onChange} className={error ? classes.errorInput : ''} /> : 
        <input type='text' id={name} name={name} value={value} onChange={onChange} className={error ? classes.errorInput : ''} />
      }
      {
        error && <span className={classes.errorMessage}>{errorMessage}</span>
      }
    </div>
  )
}

export default FormElement