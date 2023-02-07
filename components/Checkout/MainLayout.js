import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import ShippingInfo from './ShippingInfo'
import SummaryCard from './SummaryCard'

import classes from './MainLayout.module.css'

const MainLayout = ({ imageSrc, deliveryNotes }) => {

  const { locale } = useRouter()

  const [selectedWilaya, setSelectedWilaya] = useState('')
  const [selectedCommune, setSelectedCommune] = useState()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLaststName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  
  return (
    <div className={classes.main}>
      <div className={classes.showcase_container} style={{ backgroundImage: `url('${imageSrc}')` }}>
        <h2>
          {
            locale == 'ar-DZ' ? 'الدفع' : locale == 'fr-FR' ? 'Caisse' : 'Checkout'
          }
        </h2>
      </div>
      <div className={classes.layout}>
        <ShippingInfo 
          selectedCommune={selectedCommune} 
          selectedWilaya={selectedWilaya}
          setSelectedCommune={setSelectedCommune}
          setSelectedWilaya={setSelectedWilaya}
          firstName={firstName}
          lastName={lastName}
          address={address}
          phone={phone}
          email={email}
          notes={notes}
          setFirstName={setFirstName}
          setLastName={setLaststName}
          setAddress={setAddress}
          setPhone={setPhone}
          setEmail={setEmail}
          setNotes={setNotes}
        />
        <SummaryCard />
      </div>
      <div className={classes.content}>
        <button className={classes.place_order_btn}>
          {
            locale == 'ar-DZ' ? 'تأكيد الطلب' : locale == 'fr-FR' ? 'Passer la commande' : 'Place order'
          }
        </button>
        <div className={classes.shipping_notes_container}>
          <h4>
            {
              locale == 'ar-DZ' ? 'ملاحظات التوصيل' : locale == 'fr-FR' ? 'Notes de livraison' : 'Delivery notes'
            }
          </h4>
          <p>
            {
              locale == 'ar-DZ' ? deliveryNotes.ar : locale == 'fr-FR' ? deliveryNotes.fr : deliveryNotes.en                         
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default MainLayout