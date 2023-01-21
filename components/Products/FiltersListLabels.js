import { useStateContext } from '../../context/stateContext'

import classes from './FiltersListLabels.module.css'

const FiltersListLabels = () => {

  const { selectedCategories, selectedMaterials, selectedPrices } = useStateContext()

  const allFilters = [...selectedCategories, ...selectedMaterials, ...selectedPrices]

  return (
    allFilters.length > 0 && (
      <div className={classes.main}>
        {
          allFilters.map((filter, index) => (
            <div className={classes.label} key={index}>
              { filter }
            </div>
          ))
        }
      </div>
    )
  )
}

export default FiltersListLabels