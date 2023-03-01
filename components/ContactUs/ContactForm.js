import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import toast from 'react-hot-toast'
import { contactInputs } from './inputs'

import FormElement from './FormElement'

import { checkName, checkValidEmail, checkAddress, checkIndividualInput } from '../../lib/helpers/formCheckers'

import loadingGif from '../../public/assets/icons/Rolling-1s-200px.gif'

import classes from './ContactForm.module.css'

const ContactForm = ({ imageSrc }) => {

  const { locale } = useRouter()

  const [loading, setLoading] = useState(false)

  const [inputs, setInputs] = useState(contactInputs)

  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const checkFunctions = [checkName, checkValidEmail, checkAddress, checkAddress]

  const initializeValues = () => {
    setLoading(false)

    setValues({
      name: '',
      subject: '',
      email: '',
      message: ''
    })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    let errors = 0

    for (let i = 0; i < inputs.length; i++) {
      if (!checkFunctions[i](values[inputs[i].name], locale)) {
        errors++
        checkIndividualInput(inputs[i].name, inputs, setInputs)
      }
    }

    if (errors === 0) {
      setLoading(true)
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
          }
        })

        initializeValues()

        if (res.ok) {

          const successText = locale === 'ar-DZ' ? 'تم إرسال رسالتك' : locale === 'fr-FR' ? 'Votre message a été envoyé!' : 'Your message has been sent!'

          toast.success(successText, { 
            duration: 4000,
            style: {
              boxShadow: '1px 2px 5px 1px rgba(0, 0, 0, 0.10)',
              fontSize: '18px',
              padding: '5px 10px'
            }
          })
        }
        else {
          const failureText = locale === 'ar-DZ' ? 'حدث خطأ ما' : locale === 'fr-FR' ? "Quelque chose s'est mal passé" : 'Something went wrong'
          toast.error(failureText, { 
            duration: 4000,
            style: {
              boxShadow: '1px 2px 5px 1px rgba(0, 0, 0, 0.10)',
              fontSize: '18px',
              padding: '5px 10px'
            }
          })
        }
      }
      catch(err) {
        initializeValues()
        console.log(err.message)
      } 
    }
  } 

  return (  
    <div className={classes.main}>
      <div className={classes.showcase_container} style={{ backgroundImage: `url('${imageSrc}')` }}>
        <h2>{ locale == 'ar-DZ' ? 'تواصلوا معنا' : locale == 'fr-FR' ? 'Contactez-nous' : 'Contact us' }</h2>
      </div>
      <form className={classes.form}>
        <h3>
          { locale == 'ar-DZ' ? 'ابقوا على تواصل' : locale == 'fr-FR' ? 'Entrer en contact' : 'Get in touch'}
        </h3>
        <div className={classes.form_elements}>
          {
            inputs.map(input => (
              <FormElement 
                key={input.id} 
                {...input} 
                value={values[input.name]} 
                onChange={handleChange} 
                locale={locale}
              />
            ))
          }
        </div>
        <button type='submit' onClick={handleSubmit}>
          {
            loading ? <Image src={loadingGif} alt='loading' /> :
            locale == 'ar-DZ' ? 'إرسال' : locale == 'fr-FR' ? 'Envoyer le message' : 'Send message'
          }
        </button>
      </form>
    </div>
  )
}

export default ContactForm