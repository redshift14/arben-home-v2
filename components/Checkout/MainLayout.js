import { useState } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-hot-toast'

import ShippingInfo from './ShippingInfo'
import SummaryCard from './SummaryCard'
import EmptyCart from './EmptyCart'

import { client } from '../../lib/client'

import { useStateContext } from '../../context/stateContext'
import { checkName, checkIfAlgerianPhoneNumber, checkValidEmail, checkAddress, checkIndividualInput } from '../../lib/helpers'

import classes from './MainLayout.module.css'

const MainLayout = ({ imageSrc, deliveryNotes }) => {

  const { locale } = useRouter()

  const [selectedWilaya, setSelectedWilaya] = useState('0')
  const [selectedCommune, setSelectedCommune] = useState('1')

  const [loading, setLoading] = useState(false)

  const [wilayaError, setWilayaError] = useState(false)

  const { cartItems, setCartItems, setTotalPrice, setTotalQuantities, totalPrice } = useStateContext()

  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: 'firstName',
      type: 'text',
      errorMessage: locale == 'ar-DZ' ? 'يجب ألا يحتوي الاسم على أية أرقام أو حروف خاصة' : locale == 'fr-FR' ? 'Le prénom ne doit comporter aucun caractère spécial' : 'First name should not include any special characters',
      labelText: locale == 'ar-DZ' ? 'الاسم' : locale == 'fr-FR' ? 'Prénom' : 'First name',
      error: false
    },
    {
      id: 2,
      name: 'lastName',
      type: 'text',
      errorMessage: locale == 'ar-DZ' ? 'يجب ألا يحتوي اللقب على أية أرقام أو حروف خاصة' : locale == 'fr-FR' ? 'Le nom ne doit comporter aucun caractère spécial' : 'Last name should not include any special characters',
      labelText: locale == 'ar-DZ' ? 'اللقب' : locale == 'fr-FR' ? 'Nom' : 'Last name',
      error: false
    },
    {
      id: 3,
      name: 'address',
      type: 'text',
      errorMessage: locale == 'ar-DZ' ? 'يرجى كتابة العنوان' : locale == 'fr-FR' ? "Veuillez entrer l'adresse. longueur minimale 5 caractères" : 'Please enter the address. minimum length 5 characters',
      labelText: locale == 'ar-DZ' ? 'العنوان' : locale == 'fr-FR' ? 'Adresse' : 'Address',
      isWide: true,
      error: false
    },
    {
      id: 4,
      name: 'phone',
      type: 'text',
      errorMessage: locale == 'ar-DZ' ? 'يرجى إدخال رقم هاتف خليوي جزائري ' : locale == 'fr-FR' ? "Veuillez saisir un numéro de téléphone mobile algérien valide" : 'Please enter a valid algerian mobile phone number',
      labelText: locale == 'ar-DZ' ? 'رقم الهاتف' : locale == 'fr-FR' ? 'Téléphone' : 'Phone',
      error: false
    },
    {
      id: 5,
      name: 'email',
      type: 'email',
      errorMessage: locale == 'ar-DZ' ? 'يرجى إدخال بريد إلكتروني صالح' : locale == 'fr-FR' ? "Veuillez entrer un email valide" : 'Please enter a vaild email',
      labelText: locale == 'ar-DZ' ? 'البريد الإلكتروني' : 'Email',
      error: false
    },
    {
      id: 6,
      name: 'notes',
      labelText: locale == 'ar-DZ' ? 'ملاحظات إضافية' : locale == 'fr-FR' ? 'Remarques' : 'Additional notes',
      isWide: true,
      textarea: true,
    }
  ])

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    notes: '' 
  })

  const checkFunctions = [checkName, checkName, checkAddress, checkIfAlgerianPhoneNumber, checkValidEmail]

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const initializeValues = () => {
    setLoading(false)

    setValues({
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      email: '',
      notes: '' 
    })
    
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
  }

  const handleSubmitOrder = async (e) => {

    e.preventDefault()

    const res = await client.delete({query: '*[_type=="order"]'})
    
    let errors = 0
    
    if (selectedWilaya == '0') {
      setWilayaError(true)
      setTimeout(() => {
        setWilayaError(false)
      }, 3000)
    }

    else {
      for (let i = 0; i < inputs.length-1; i++) {
        if (!checkFunctions[i](values[inputs[i].name], locale)) {
          errors++
          checkIndividualInput(inputs[i].name, inputs, setInputs)
        }
      }
    }

    if (errors === 0 && selectedWilaya != '0') {

      setLoading(true)

      // products in order array to insert in order document
      const productsInOrder = cartItems.map((item, index) => {
        const { id, modelKey, title, size, price, quantity } = item
        return ({
          _key: index.toString(),
          productID: id,
          modelKey: modelKey,
          productTitle: title,
          size,
          price, 
          quantity
        })
      })

      const deliveryCost = totalPrice > 2999 ? 0 : 500
      
      // new order object
      const newOrder = {
        client: {
          firstName: values.firstName,
          lastName: values.lastName,
          wilaya: selectedWilaya,
          commune: selectedCommune,
          address: values.address,
          phone: values.phone,
          email: values.email,
        },
        product: productsInOrder,
        deliveryCost,
        subtotal: totalPrice,
        total: totalPrice + deliveryCost,
        notes: values.notes
      }

      try {
        // creating order document
        const orderRes = await client.create({
          ...newOrder,
          _type: 'order'
        })

        const productsIDs = orderRes.product.map(p => ( p.productID ))

        const modelsKeys = orderRes.product.map(p => ( p.modelKey ))

        const defaultQuantities = orderRes.product.map(p => ( p.quantity ))

        const docs = await client.getDocuments(productsIDs)

        // array of models to update
        const updatedModels = docs.map((doc, index) => {
          return doc.models.map(model => {
            if (model._key == modelsKeys[index]) {
              return {
                ...model,
                quantity: model.quantity - defaultQuantities[index]
              }
            }
            return model
          })
        })

        // Manipulation the updated models array to choose the minimal quantity, with a help from chatgpt

        // If any repeated models with different quantites, set the quantity to the smallest
        const quantities = {}

        // First loop through the array and store the quantities of each _key - chatgpt function
        updatedModels.forEach(subarray => {
          subarray.forEach(obj => {
            const { _key, quantity } = obj
            if (!quantities[_key]) {
              quantities[_key] = [quantity]
            } else {
              quantities[_key].push(quantity)
            }
          })
        })

        // Next, loop through the array again and set the bigger quantity to be equal to the smaller - chatgpt function
        updatedModels.forEach(subarray => {
          subarray.forEach(obj => {
            const { _key, quantity } = obj
            const quantitiesForKey = quantities[_key];
            if (quantitiesForKey.length > 1) {
              const maxQuantity = Math.max(...quantitiesForKey)
              const minQuantity = Math.min(...quantitiesForKey)
              if (quantity === maxQuantity) {
                obj.quantity = minQuantity
              } else if (quantity === minQuantity) {
                obj.quantity = minQuantity
              }
            }
          })
        })

        const updatedDocs = docs.map(async(doc, index) => {
          return await client.patch(doc._id).set({ models: updatedModels[index] }).commit()
        })

        if (updatedDocs) {

          orderRes.emailLang = locale

          const emailRes = await fetch('/api/order', {
            method: 'POST',
            body: JSON.stringify(orderRes),
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json"
            }
          })

          console.log(emailRes)

          toast.success('Your order has been issued!, an email with full order details will be sent to you', { 
            duration: 6000,
            style: {
              boxShadow: '1px 2px 5px 1px rgba(0, 0, 0, 0.10)',
              fontSize: '18px',
              padding: '10px 15px',
              margin: '10px'
            }
          })

          initializeValues()
        }
      }
      catch(err) {
        initializeValues()
        console.log(err)
      }
    }
  }

  return (
    <div className={classes.main}>
      {
        cartItems.length <= 0 ? <EmptyCart /> :
        <>
          <div 
            className={classes.showcase_container} 
            style={{ backgroundImage: `url('${imageSrc}')` }}
          >
            <h2>
              {
                locale == 'ar-DZ' ? 'الدفع' : locale == 'fr-FR' ? 'Caisse' : 'Checkout'
              }
            </h2>
          </div>
          <div className={classes.layout}>
            <ShippingInfo 
              values={values}
              inputs={inputs}
              handleChange={handleChange}
              handleSubmit={handleSubmitOrder}
              loading={loading}
              selectedCommune={selectedCommune} 
              selectedWilaya={selectedWilaya}
              wilayaError={wilayaError}
              setSelectedCommune={setSelectedCommune}
              setSelectedWilaya={setSelectedWilaya}
            />
            <SummaryCard cartItems={cartItems} totalPrice={totalPrice} />
          </div>
          <div className={classes.content}>
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
        </>
      }
    </div>
  )
}

export default MainLayout