import { useStateContext } from '../../context/stateContext'

import classes from './FiltersListLabels.module.css'

const FiltersListLabels = () => {

  const { selectedAllFiltersWithTranslation } = useStateContext()

  return (
    selectedAllFiltersWithTranslation.length > 0 && (
      <div className={classes.main}>
        {
          selectedAllFiltersWithTranslation.map((name, index) => (
            <div className={classes.label} key={index}>
              { name }
            </div>
          ))
        }
      </div>
    )
  )
}

export default FiltersListLabels