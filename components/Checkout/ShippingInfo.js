import Image from 'next/image'
import dynamic from 'next/dynamic'
import wilayas from '../../lib/data/wilayaAlgeria.json'

const FormElement = dynamic(() => import('./FormElement'))

import loadingGif from '../../public/assets/icons/Rolling-1s-200px.gif'

import classes from './ShippingInfo.module.css'

const ShippingInfo = ({ 
  selectedWilaya, wilayaError, setSelectedWilaya, inputs, values, handleChange, handleSubmit, loading, locale
}) => {

  const handleWilayaChange = (e) => {
    setSelectedWilaya(e.target.value)
  }

  return (
    <div className={classes.main}>
      <h3>
        {
          locale == 'ar-DZ' ? 'معلومات التوصيل' : locale == 'fr-FR' ? 'Adresse de livraison' : 'Delivery address'
        }
      </h3>      
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.elements}>
          <FormElement
            name='wilaya'
            labelTextAr='الولاية'
            labelTextFr='Wilaya'
            labelTextEn='Wilaya'
            error={wilayaError}
            errorMessageAr='يرجى ادخال الولاية'
            errorMessageFr='Veuillez saisir la wilaya'
            errorMessageEn='Please enter the wilaya'
          >
            <select onChange={handleWilayaChange} value={selectedWilaya} id='wilaya'>
              {
                wilayas.map(wilaya => (
                  <option key={wilaya.id} value={wilaya.id}>
                    { locale == 'ar-DZ' ? wilaya.ar_name : wilaya.name }
                  </option>
                ))
              }
            </select>
          </FormElement>
          {
            inputs.map(input => {
              const { id, name } = input
              return (
                <FormElement 
                  key={id} 
                  {...input} 
                  value={values[name]} 
                  onChange={handleChange} 
                  locale={locale}
                />
              )
            })
          }
        </div>
        <button className={classes.place_order_btn} type='submit'>
          {
            loading ? <Image src={loadingGif} alt='loading' /> :
            locale == 'ar-DZ' ? 'تأكيد الطلب' : locale == 'fr-FR' ? 'Passer la commande' : 'Place order'
          }
        </button>
      </form>
      
    </div>
  )
}

export default ShippingInfo