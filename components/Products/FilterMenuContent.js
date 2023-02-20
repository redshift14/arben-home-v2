import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useStateContext } from '../../context/stateContext'

import FilterMenuItem from './FilterMenuItem'

const FilterMenuContent = () => {
  
  const { locale } = useRouter()

  const router = useRouter()

  const { handleFilterOptionsChange, selectedCategories, setSelectedCategories,  selectedMaterials, setSelectedMaterials, selectedColors, setSelectedColors, selectedStyles, setSelectedStyles, allCategories, allMaterials, allColors, allStyles } = useStateContext()
  
  useEffect(() => {
    if (router.query.category) {
      setSelectedCategories([router.query.category])
    }
  }, [])

  const titles = [
    locale === 'ar-DZ' ? 'الصنف' : locale === 'fr-FR' ? 'Catégorie' : 'Category',
    locale === 'ar-DZ' ? 'اللون' : locale === 'fr-FR' ? 'Coleur' : 'Color',
    locale === 'ar-DZ' ? 'المواد المستعملة' : locale === 'fr-FR' ? 'Matériaux utilisés' : 'Materials used',
    locale === 'ar-DZ' ? 'الطراز' : locale === 'fr-FR' ? 'Style' : 'Style',
  ]

  const allFilters = [allCategories, allColors, allMaterials, allStyles]
  const selectedFilters = [selectedCategories, selectedColors, selectedMaterials, selectedStyles]
  const setSelectedFilters = [setSelectedCategories, setSelectedColors, setSelectedMaterials, setSelectedStyles]
  const filtersNames = ['category', 'color', 'material', 'style']

  return (
    <>
      <FilterMenuItem 
        title={locale === 'ar-DZ' ? 'السعر' : locale === 'fr-FR' ? 'Prix' : 'Price'} 
        filterName={'price'}
        isPriceItem={true}
      /> 
      {
        allFilters.map((filter, index) => (
          <FilterMenuItem 
            key={index}
            title={titles[index]} 
            filterName={filtersNames[index]}
            options={filter}
            selectedOptions={selectedFilters[index]}
            handleCheckboxChange={(e) => handleFilterOptionsChange(e, selectedFilters[index], setSelectedFilters[index], filtersNames[index])}
          /> 
        ))
      }
    </>
  )
}

export default FilterMenuContent