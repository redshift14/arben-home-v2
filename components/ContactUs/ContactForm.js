import { useState } from 'react'
import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { client } from '../../lib/client'
import { contactInputs } from '../../lib/data/contactInputs'

const Notifier = dynamic(() => import('../Notifier'))
const FormElement = dynamic(() => import('./FormElement'))

import { checkName, checkValidEmail, checkAddress, checkIndividualInput } from '../../lib/helpers/formCheckers'

import loadingGif from '../../public/assets/icons/Rolling-1s-200px.gif'

import classes from './ContactForm.module.css'

const ContactForm = ({ imageData, locale }) => {

  const imageProps = useNextSanityImage(client, imageData)

  const [notifier, setNotifier] = useState({
    show: false, 
    success: true,
    message: ''
  })

  const [inputs, setInputs] = useState(contactInputs)

  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)

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
          setNotifier({ show: true, success: true, message: successText })
        }
        else {
          const failureText = locale === 'ar-DZ' ? 'حدث خطأ ما' : locale === 'fr-FR' ? "Quelque chose s'est mal passé" : 'Something went wrong'
          setNotifier({ show: true, success: false, message: failureText})
        }

        setTimeout(() => {
          setNotifier({...notifier, show: false})
        }, 4000)
      }
      catch(err) {
        initializeValues()
        console.log(err.message)
      } 
    }
  } 

  return (  
    <section className={classes.main}>
      <div className='showcase-with-bg-image'>
        <Image 
          {...imageProps} 			
          style={{ width: '100%', height: '100%', objectFit:'cover' }} 
          loader={imageProps.loader}
          alt='bed sheets black and white'
          sizes='100vw'
          priority
        />
        <h2>
          { 
            locale == 'ar-DZ' ? 'تواصلوا معنا' : locale == 'fr-FR' ? 'Contactez-nous' : 'Contact us'
          }
        </h2>
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
       {
        notifier.show && <Notifier message={notifier.message} success={notifier.success} />
       }
    </section>
  )
}

export default ContactForm