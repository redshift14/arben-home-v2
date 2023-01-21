import { useRouter } from 'next/router'

import { categories, prices, materials } from './filtersData'

import { useStateContext } from '../../context/stateContext'

import FilterMenuItem from './FilterMenuItem'

const FilterMenuContent = () => {

  const { locale } = useRouter()

  const { handleFilterOptionsChange, selectedCategories, setSelectedCategories, selectedPrices, setSelectedPrices, selectedMaterials, setSelectedMaterials } = useStateContext()

  return (
    <>
      <FilterMenuItem 
        title={locale === 'ar-DZ' ? 'الصنف' : locale === 'fr-FR' ? 'Catégorie' : 'Category'} 
        filterName='category'
        options={categories}
        selectedOptions={selectedCategories}
        handleCheckboxChange={(e) => handleFilterOptionsChange(e, selectedCategories, setSelectedCategories, 'category')}
      /> 
      <FilterMenuItem 
        title={locale === 'ar-DZ' ? 'السعر' : locale === 'fr-FR' ? 'Prix' : 'Price'} 
        filterName='price'
        options={prices}
        selectedOptions={selectedPrices}
        handleCheckboxChange={(e) => handleFilterOptionsChange(e, selectedPrices, setSelectedPrices, 'price')}
      /> 
      <FilterMenuItem 
        title={locale === 'ar-DZ' ? 'المواد المستعملة' : locale === 'fr-FR' ? 'Matérials utilisé' : 'Materials used'} 
        filterName='material'
        options={materials}
        selectedOptions={selectedMaterials}
        handleCheckboxChange={(e) => handleFilterOptionsChange(e, selectedMaterials, setSelectedMaterials, 'material')}
      /> 
    </>
  )
}

export default FilterMenuContent