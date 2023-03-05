import { useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import wilayas from '../../lib/data/wilayaAlgeria.json'
import communes from '../../lib/data/communeAlgeria.json'

const FormElement = dynamic(() => import('./FormElement'))

import loadingGif from '../../public/assets/icons/Rolling-1s-200px.gif'

import classes from './ShippingInfo.module.css'

const ShippingInfo = ({ 
  selectedWilaya, wilayaError, selectedCommune, setSelectedWilaya, setSelectedCommune, inputs, values, handleChange, handleSubmit, loading, locale
}) => {
  
  const [communeList, setCommuneList] = useState([])

  const handleWilayaChange = (e) => {
    setSelectedWilaya(e.target.value)
  }

  const handleCommuneChange = (e) => {
    setSelectedCommune(e.target.value)
  } 

  useEffect(() => {
    setCommuneList(communes.filter(commune => commune.wilaya_id === selectedWilaya))
  }, [selectedWilaya])

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
          <FormElement
            name='commune'
            labelTextAr='البلدية'
            labelTextFr='Commune'
            labelTextEn='Town'
          >
            <select onChange={handleCommuneChange} value={selectedCommune} id='wilaya' disabled={communeList.length === 0}>
              {
                communeList?.map(commune => (
                  <option key={commune.id} value={commune.id}>
                    { locale == 'ar-DZ' ? commune.ar_name : commune.name }
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