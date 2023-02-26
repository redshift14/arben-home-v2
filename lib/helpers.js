export const capitilizeFirstLetter = (string) => {
  string = string.charAt(0).toUpperCase()+string.slice(1)
  return string
}

export const checkName = (name, locale) => {

  const isLetter = (l) => {
    return l.toLowerCase() != l.toUpperCase()
  }

  const isSubset = (a1, a2) => {
    return a2.every(function(element) {
      return a1.includes(element)
    })
  }

  const letters = name.split('')

  const arabicAlphabet = ['ء', 'أ', 'إ', 'ا', 'ب', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'ك', 'ل', 'م', 'ن', 'و', 'ة', 'ه', 'ی', 'ي', 'ئ', ' ']

  if (locale == 'ar-DZ') {
    return isSubset(arabicAlphabet, letters)
  }

  else {

    if (letters.length > 16 || letters.length < 3) return false
    
    let errors = 0
  
    letters.forEach(letter => {
      if (!isLetter(letter) && letter !== ' ') errors++
    })
  
    return errors === 0
  }
}

export const checkIfAlgerianPhoneNumber = (number) => {

  if (number.length != 10) return false

  if (number.slice(0,2) != '05' && number.slice(0,2) != '06' && number.slice(0,2) != '07' ) return false

  const isNumber = (c) => {
    if (typeof c !== 'string') return false
    if (c.trim() === '') return false
    return !isNaN(c)
  }

  const numbers = number.split('')
  let errors = 0

  numbers.forEach(n => {
    if (!isNumber(n)) errors++
  })

  return errors === 0
}

export const checkValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}

export const checkAddress = (address) => {
  if (address.length < 5) return false 
  else return true
}

export const checkIndividualInput = (property, objects, setter) => {
  const defaultObjects = objects
  const newObjects = objects.map(object => {
    if (object.name === property) return {...object, error: true}
    else return object
  })
  setter(newObjects)
  setTimeout(() => {
    setter(defaultObjects)
  }, 3000)
}

const getDate = (data) => {
  const date = new Date(data._createdAt)
  return `${date.getFullYear()}/${date.getUTCMonth()+1}/${date.getUTCDate()}`
}

export const generateContactFormEmailContent = (data) => {
  const stringData = Object.entries(data).reduce((str, [key, value]) => {
    return str += `${capitilizeFirstLetter(key)}: \n${value} \n \n`
  }, '')

  const htmlData = Object.entries(data).reduce((str, [key, value]) => {
    return str += `<h1 class="form-heading" align="left">${capitilizeFirstLetter(key)}</h1><p class="form-answer" align="left">${value}</p>`
  }, '')

  return {
    text: stringData, 
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`
  }
}

export const generateNotificationEmailContent = (data) => {
  
  const getProductsString = () => {
    let str = ''
    data.product.forEach((p, index) => {
      str += `
        Product ${index+1}
        ID: ${p.productID}
        Title: ${p.productTitle}
        Size: ${p.size}
        Price: ${p.price}
        Quantity: ${p.quantity}
      `
    })
    return str
  }
  
  const getProducts = () => {
    let str = ''
    data.product.forEach(p => {
      str += `
        <tr>
          <td>${p.productID}</td>
          <td>${p.productTitle}</td>
          <td>${p.size}</td>
          <td>${p.price}</td>
          <td>${p.quantity}</td>
        </tr>
      `
    })
    return str
  }

  const stringData = `
    Order details 
    Date: ${getDate(data)} 
    Delivery cost: ${data.deliveryCost}
    Subtotal: ${data.subtotal}
    Total: ${data.total}
    Notes: ${data.notes}
    Products included
    ${getProductsString()}
    Client details
    Name: ${data.client.firstName + ' ' + data.client.lastName}
    Wilaya: ${data.client.wilaya}
    Address: ${data.client.address}
    Phone: ${data.client.phone}
    Email: ${data.client.email}
  `

  const htmlData = `<!DOCTYPE html> <html> <head> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style>body{width:100%; height:100% margin: 30px; padding: 20px 30px; box-sizing: border-box; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; display: flex; flex-direction: column; gap: 10px; border: 1px solid black; border-style: dashed;}body h1{font-size: 24px; text-align: center; width: 100%; align-self: center;}.details-container h2{font-size: 16px; margin-bottom: 10px; margin-top: 10px;}.details-container p{font-size: 14px;}.details-container h3{font-size: 15px;}.order-details, .client-details{display: grid; grid-template-columns: 1fr 1fr; padding: 10px 0;}.products-table-container{padding: 30px 0;}.products-table-container table{width: 100%; border-collapse: collapse;}.products-table-container td, th{border: 1px solid black; text-align: left; padding: 15px 8px; font-size: 14px;}</style> </head> <body> <h1>You have a new order!</h1> <div class="details-container"> <h2>Order details</h2> <div class="order-details"> <p><strong>Date: </strong>${getDate(data)}</p><p><strong>Delivery cost: </strong>${data.deliveryCost}</p><p><strong>Subtotal: </strong>${data.subtotal}</p><p><strong>Total: </strong>${data.total}</p><p><strong>Notes: </strong>${data.notes}</p></div></div><div class="details-container"> <h2>Products included</h2> <div class="products-table-container"> <table> <tr> <th>Product ID</th> <th>Title</th> <th>Size</th> <th>Price</th> <th>Quantity</th> </tr>${getProducts()}</table> </div></div><div class="details-container"> <h2>Client details</h2> <div class="client-details"> <p><strong>Name: </strong>${data.client.firstName + ' ' + data.client.lastName}</p><p><strong>Wilaya: </strong>${data.client.wilaya}</p><p><strong>Address: </strong>${data.client.address}</p><p><strong>Phone: </strong>${data.client.phone}</p><p><strong>Email: </strong>${data.client.email}</p></div></div></body> </html>`

  return {
    text: stringData,
    html: htmlData
  }
}

export const generateClientEmailContent = (data) => {

  const dir = data.emailLang === 'ar-DZ' ? 'rtl' : 'ltr'

  const titleText = data.emailLang === 'ar-DZ' ? 'تم تأكيد طلبك' : data.emailLang === 'fr-FR' ? 'Votre commande a été confirmée' : 'Your order has been confirmed'

  const introText = data.emailLang === 'ar-DZ' ? `لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور  أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا` : data.emailLang === 'fr-FR' ? `Cher ${data.client.firstName} ${data.client.lastName} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo cumque ea dolore eius fuga numquam accusamus distinctio quibusdam eum facere.` : `Dear ${data.client.firstName} ${data.client.lastName} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo cumque ea dolore eius fuga numquam accusamus distinctio quibusdam eum facere.`

  const overviewTitle = data.emailLang === 'ar-DZ' ? 'نظرة عامة على الطلب' : data.emailLang === 'fr-FR' ? 'Aperçu de votre commande' : 'Your order overview'

  const dateText = data.emailLang === 'ar-DZ' ? 'التاريخ: ' : 'Date: '
  const wilayaText = data.emailLang === 'ar-DZ' ? 'الولاية: ' : 'Wilaya: '
  const deliveryText = data.emailLang === 'ar-DZ' ? 'تكاليف التوصيل: ' : data.emailLang === 'fr-FR' ? 'Livraison: ' : 'Delivery cost: '
  const totalText = data.emailLang === 'ar-DZ' ? 'المجموع: ' : 'Total: '

  const productsTitle = data.emailLang === 'ar-DZ' ? 'المنتجات' : data.emailLang === 'fr-FR' ? 'Les produits' : 'Products'

  const tableTitle = data.emailLang === 'ar-DZ' ? 'اسم المنتج' : data.emailLang === 'fr-FR' ? 'Titre' : 'Title'
  const tableSize = data.emailLang === 'ar-DZ' ? 'القياس' : data.emailLang === 'fr-FR' ? 'Taille' : 'Size'
  const tableQuantity = data.emailLang === 'ar-DZ' ? 'الكمية' : data.emailLang === 'fr-FR' ? 'Quantité' : 'Quantity'
  const tablePrice = data.emailLang === 'ar-DZ' ? 'السعر' : data.emailLang === 'fr-FR' ? 'Prix' : 'Price'

  const outroText = data.emailLang === 'ar-DZ' ? `لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور  أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا` : data.emailLang === 'fr-FR' ? 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo cumque ea dolore eius fuga numquam accusamus distinctio quibusdam eum facere.' : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo cumque ea dolore eius fuga numquam accusamus distinctio quibusdam eum facere.'

  const getProducts = () => {
    let str = ''
    data.product.forEach(p => {
      str += `
        <tr>
          <td>${p.productTitle}</td>
          <td>${p.size}</td>
          <td>${p.price}</td>
          <td>${p.quantity}</td>
        </tr>
      `
    })
    return str
  }

  const htmlData = `
    <!DOCTYPE html> <html> <head> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> </head> <style>body{margin: 0; padding: 20px 30px; box-sizing: border-box; font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; display: flex; flex-direction: column; gap: 10px; width: 100%; height: 100%;}body h1{font-size: 24px; text-align: center; width: 100%; align-self: center;}.text{font-size: 15px; line-height: 28px;}h2{font-size: 16px; margin-bottom: 10px; margin-top: 10px;}.overview-container p{font-size: 14px;}.overview-container h3{font-size: 15px;}.overview{display: grid; grid-template-columns: 1fr 1fr; padding: 10px 0;}.products-table-container{padding: 10px 0;}.products-table-container table{width: 100%; border-collapse: collapse;}.products-table-container th{text-align: center;}.products-table-container td, th{border: 1px solid black; text-align: left; padding: 15px 8px; font-size: 14px; text-align: center;}</style> <body dir="${dir}"> <h1>${titleText}</h1> <p class="text">${introText}</p><div class="overview-container"> <h2>${overviewTitle}</h2> <div class="overview"> <p><strong>${dateText}</strong>${getDate(data)}</p><p><strong>${wilayaText}</strong>${data.client.wilaya}</p><p><strong>${deliveryText}</strong>${data.deliveryCost}</p><p><strong>${totalText}</strong>${data.total}</p></div></div><div class="products-container"> <h2>${productsTitle}</h2> <div class="products-table-container"> <table dir="ltr"> <tr> <th>${tableTitle}</th> <th>${tableSize}</th> <th>${tablePrice}</th> <th>${tableQuantity}</th> </tr>${getProducts()}</table> </div></div><p class="text">${outroText}</p></body> </html>
  `

  return {
    html: htmlData
  }
}