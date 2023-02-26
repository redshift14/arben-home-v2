import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import wilayas from './wilayaAlgeria.json'
import communes from './communeAlgeria.json'

import FormElement from './FormElement'

import loadingGif from '../../public/assets/icons/Rolling-1s-200px.gif'

import classes from './ShippingInfo.module.css'

const ShippingInfo = ({ 
  selectedWilaya, wilayaError, selectedCommune, setSelectedWilaya, setSelectedCommune, inputs, values, handleChange, handleSubmit, loading
}) => {
  
  const { locale } = useRouter()

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
            labelText={locale == 'ar-DZ' ? 'الولاية' : 'Wilaya'}
            error={wilayaError}
            errorMessage={locale == 'ar-DZ' ? 'يرجى ادخال الولاية' : locale == 'fr-FR' ? 'Veuillez saisir la wilaya' : 'Please enter the wilaya'}
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
            labelText={locale == 'ar-DZ' ? 'البلدية' : locale == 'fr-FR' ? 'Commune' : 'Town'}
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
                  key={id} {...input} value={values[name]} onChange={handleChange}
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