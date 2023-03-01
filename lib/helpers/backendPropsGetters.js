// function to get sorting options from context variable in url
export const getSortingOptions = (sorting) => {

  const sortingOption =  sorting === 'alphabetically' ? 'title' : sorting === 'priceDecroissant' ? 'models[0].price' : sorting === 'priceCroissant' ? 'models[0].price' : '_createdAt'

  let sortingDirection

  if (sorting === 'alphabetically' || sorting === 'priceCroissant') {
    sortingDirection = 'asc'
  }
  else {
    sortingDirection = 'desc'
  }

  return {
    sortingOption, sortingDirection
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////

// function to get the inner query for a one type of filter from context variable in url
const getInnerfilterQuery = (filterType, filterName, filterVarName) => {
  const queryVariableArray = filterType ? filterType.split(',') : []

  let loopedQuery = ''
  if (queryVariableArray.length > 0) {
    loopedQuery = queryVariableArray.map(variable => (
      `'${variable}' in ${filterName}[]->.${filterVarName}.en || `
    )).join('').slice(0, -3)
  }

  if (loopedQuery.length > 0) return '(' + loopedQuery + ')'
  else return undefined
}

// function to return the complete filter for all types query from context variable in url
export const getMainFilterQuery = (category, color, material, style, sortingOption
  , sortingDirection, minPrice, maxPrice) => {

    let validMinPrice = 1
    let validMaxPrice = 20000
    if (minPrice) validMinPrice = parseInt(minPrice)
    if (maxPrice) validMaxPrice = parseInt(maxPrice)

  return `
    *[_type=='product' && !(_id in path("drafts.**"))
      ${getInnerfilterQuery(category, 'categories' , 'categoryName') ? 
      '&& ' + getInnerfilterQuery(category, 'categories' , 'categoryName') : ''}
      ${getInnerfilterQuery(color, 'colors' , 'colorName') ? 
      '&& ' + getInnerfilterQuery(color, 'colors' , 'colorName') : ''} 
      ${getInnerfilterQuery(material, 'materialsUsed' , 'materialName') ? 
      '&& ' + getInnerfilterQuery(material, 'materialsUsed' , 'materialName')  : ''} 
      ${getInnerfilterQuery(style, 'styles' , 'styleName') ? 
      '&& ' + getInnerfilterQuery(style, 'styles' , 'styleName') : ''}
      && (models[0].price >= ${parseInt(validMinPrice)} && models[0].price <= ${parseInt(validMaxPrice)}) 
    ] | order(${sortingOption} ${sortingDirection})
  `
}