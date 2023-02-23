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
