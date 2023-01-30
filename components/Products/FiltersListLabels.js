import { useStateContext } from '../../context/stateContext'

import classes from './FiltersListLabels.module.css'

const FiltersListLabels = () => {

  const { selectedCategories, selectedColors, selectedMaterials, selectedStyles } = useStateContext()

  const allFilters = [...selectedCategories, ...selectedColors, ...selectedMaterials, ...selectedStyles ]

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