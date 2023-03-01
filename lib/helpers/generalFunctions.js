// tha name describes it
export const capitilizeFirstLetter = (string) => {
  string = string.charAt(0).toUpperCase()+string.slice(1)
  return string
}

// function to organize style, materialsUsed, colors, categories to display properly
export const addCommasToArrayElements = (array, nameKey, locale) => {
  const elementsArray = array.map(item => {
    return locale === 'ar-DZ' ? item[nameKey].ar + ', ' : locale === 'fr-FR' ? item[nameKey].fr + ', ' : item[nameKey].en + ', '
  })
  elementsArray.forEach((element, index) => {
    if (index === elementsArray.length-1) {
      elementsArray[index] = element.slice(0 , -2)
    }
  })
  return elementsArray
}

// get page title in categories pages
export const getPageTitle = (categoryPage, asPath, locale) => {
  if (categoryPage) {
    if (asPath == '/category/quilt%20cover') {
      return locale === 'ar-DZ' ? 'أغلفة اللحاف' : locale === 'fr-FR' ? 'Housses de couette' : 'Quilt covers'
    }
    else if (asPath == '/category/bed%20sheet') {
      return locale === 'ar-DZ' ? 'شراشف' : locale === 'fr-FR' ? 'Draps de lit' : 'Bed sheets'
    }
    else if (asPath == '/category/pillowcase') {
      return locale === 'ar-DZ' ? 'أغلفة وسائد' : locale === 'fr-FR' ? "Taies d'oreiller" : 'Pillowcases'
    }
    else return locale === 'ar-DZ' ? 'المنتجات' : locale === 'fr-FR' ? 'Les produits' : 'Products'
  }
}