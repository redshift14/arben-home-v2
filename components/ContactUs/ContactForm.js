import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import toast from 'react-hot-toast'

import FormElement from './FormElement'

import { checkName, checkValidEmail, checkAddress, checkIndividualInput } from '../../lib/helpers'

import loadingGif from '../../public/assets/icons/Rolling-1s-200px.gif'

import classes from './ContactForm.module.css'

const ContactForm = ({ imageSrc }) => {

  const { locale } = useRouter()

  const [loading, setLoading] = useState(false)

  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: 'name',
      errorMessage: locale == 'ar-DZ' ? 'يجب ألا يحتوي الاسم على أية أرقام أو حروف خاصة' : locale == 'fr-FR' ? 'Le prénom ne doit comporter aucun caractère spécial' : 'First name should not include any special characters',
      labelText: locale == 'ar-DZ' ? 'الإسم' : locale == 'fr-FR' ? 'Votre nom' : 'Your name',
      error: false
    },
    {
      id: 2,
      name: 'email',
      errorMessage: locale == 'ar-DZ' ? 'يرجى إدخال بريد إلكتروني صالح' : locale == 'fr-FR' ? "Veuillez entrer un email valide" : 'Please enter a vaild email',
      labelText: locale == 'ar-DZ' ? 'بريدك الالكتروني' : locale == 'fr-FR' ? 'Votre email' : 'Your email',
      error: false
    },
    {
      id: 3,
      name: 'subject',
      errorMessage: locale == 'ar-DZ' ? 'يرجى إدخال بريد موضوع الرسالة' : locale == 'fr-FR' ? "Veuillez saisir l'objet du message" : 'Please enter the message subject',
      labelText: locale == 'ar-DZ' ? 'الموضوع' : locale == 'fr-FR' ? 'Objet' : 'Subject',
      error: false
    },
    {
      id: 4,
      name: 'message',
      textArea: true,
      errorMessage: locale == 'ar-DZ' ? 'يرجى إدخال الرسالة' : locale == 'fr-FR' ? 'Veuillez entrer le message' : 'Please enter the message',
      labelText: locale == 'ar-DZ' ? 'الرسالة' : 'Message',
      error: false
    },
  ])

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

        console.log(res)
        initializeValues()

        toast.success('Your message has been sent!', { 
          duration: 4000,
          style: {
            boxShadow: '1px 2px 5px 1px rgba(0, 0, 0, 0.10)',
            fontSize: '18px',
            padding: '5px 10px'
          }
        })
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
              <FormElement key={input.id} {...input} value={values[input.name]} onChange={handleChange} />
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