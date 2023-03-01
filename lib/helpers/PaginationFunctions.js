// function to get the list to display currently
export const getPaginationCurrentList = (currentPage, itemsPerPage, itemsList) => {
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  return itemsList.slice(indexOfFirstItem, indexOfLastItem)
}

// paginate with number
export const paginate = (pageNumber, setter) => {
  setter(pageNumber)
}

// to next page
export const nextPage = (maxNumber, currentPage, setter) => {
  if (currentPage < maxNumber) {
    setter(v => v = v+1)
  }
}

// to prev page
export const prevPage = (currentPage, setter) => {
  if (currentPage > 1) {
    setter(v => v = v-1)
  }
}