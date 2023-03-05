 export const getOptionName = (option, filterName) => {
  if (filterName == 'category') return option.categoryName.en
  else if (filterName == 'material') return option.materialName.en
  else if (filterName == 'style') return option.styleName.en
  else if (filterName == 'color') return option.colorName.en
}

export const getOptionNameTranslated = (option, filterName, locale) => {
  if (filterName == 'category') {
    if (locale === 'ar-DZ') return option.categoryName.ar
    else if (locale == 'fr-FR') return option.categoryName.fr
    else return option.categoryName.en
  }
  else if (filterName == 'material') {
    if (locale === 'ar-DZ') return option.materialName.ar
    else if (locale == 'fr-FR') return option.materialName.fr
    else return option.materialName.en
  }
  else if (filterName == 'style') {
    if (locale === 'ar-DZ') return option.styleName.ar
    else if (locale == 'fr-FR') return option.styleName.fr
    else return option.styleName.en
  }
  else if (filterName == 'color') {
    if (locale === 'ar-DZ') return option.colorName.ar
    else if (locale == 'fr-FR') return option.colorName.fr
    else return option.colorName.en
  }
}

// functions to get the translation of a filter
const loopFilterArray = (toTranslate, arr, translationLang) => {
  for (let i = 0; i < arr.length; i++) {
    if (toTranslate === arr[i].en) return arr[i][translationLang]
  }
}

export const translateFilter = (toTranslate, type, locale, categories, colors, materials, styles) => {
  const lang = locale.split('-')[0]
  switch (type) {
    case 'category': return loopFilterArray(toTranslate, categories, lang); break;
    case 'color': return loopFilterArray(toTranslate, colors, lang); break;
    case 'material': return loopFilterArray(toTranslate, materials, lang); break;
    case 'style': return loopFilterArray(toTranslate, styles, lang); break;
  }
}