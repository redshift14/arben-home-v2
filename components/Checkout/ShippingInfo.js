import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import wilayas from './wilayaAlgeria.json'
import communes from './communeAlgeria.json'

import classes from './ShippingInfo.module.css'

const ShippingInfo = ({ 
  selectedWilaya, selectedCommune, setSelectedWilaya, setSelectedCommune, firstName, lastName, address, phone, email, notes, setFirstName, setLastName, setAddress, setPhone, setEmail, setNotes 
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
      <div className={classes.form}>
        <div className={classes.form_element}>
          <label htmlFor='firstName'>
            { locale == 'ar-DZ' ? 'الاسم' : locale == 'fr-FR' ? 'Prénom' : 'First name' }
          </label>
          <input type='text' id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className={classes.form_element}>
          <label htmlFor='lastName'>
            { locale == 'ar-DZ' ? 'اللقب' : locale == 'fr-FR' ? 'Nom' : 'Last name' }
          </label>
          <input type='text' id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className={classes.form_element}>
          <label htmlFor='wilaya'>
            { locale == 'ar-DZ' ? 'الولاية' : 'Wilaya' }
          </label>
          <select onChange={handleWilayaChange} value={selectedWilaya} id='wilaya'>
            {
              wilayas.map(wilaya => (
                <option key={wilaya.id} value={wilaya.id}>
                  { locale == 'ar-DZ' ? wilaya.ar_name : wilaya.name }
                </option>
              ))
            }
          </select>
        </div>
        <div className={classes.form_element}>
          <label htmlFor='commune'>
            { locale == 'ar-DZ' ? 'البلدية' : locale == 'fr-FR' ? 'Commune' : 'Town' }
          </label>
          <select onChange={handleCommuneChange} value={selectedCommune} id='wilaya' disabled={communeList.length === 0}>
            {
              communeList?.map(commune => (
                <option key={commune.id} value={commune.id}>
                  { locale == 'ar-DZ' ? commune.ar_name : commune.name }
                </option>
              ))
            }
          </select>
        </div>
        <div className={`${classes.form_element} ${classes.form_element_wide}`}>
          <label htmlFor='adress'>
            { locale == 'ar-DZ' ? 'العنوان' : locale == 'fr-FR' ? 'Adresse' : 'Address' }
          </label>
          <input type='text' id='adress' value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className={classes.form_element}>
          <label htmlFor='email'>
            { locale == 'ar-DZ' ? 'البريد الإلكتروني' : locale == 'fr-FR' ? 'Email' : 'Email' }
          </label>
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={classes.form_element}>
          <label htmlFor='phone'>
            { locale == 'ar-DZ' ? 'رقم الهاتف' : locale == 'fr-FR' ? 'Téléphone' : 'Phone' }
          </label>
          <input type='text' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className={`${classes.form_element} ${classes.form_element_wide}`}>
          <label htmlFor='notes'>
            { locale == 'ar-DZ' ? 'ملاحظات إضافية' : locale == 'fr-FR' ? 'Remarques' : 'Additional notes' }
          </label>
          <textarea id='notes' value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>
    </div>
  )
}

export default ShippingInfo