import Link from 'next/link'
import { useRouter } from 'next/router'
import { addCommasToArrayElements, capitilizeFirstLetter } from '../../lib/helpers/generalFunctions'

import { useStateContext } from '../../context/stateContext'

import classes from './OtherInfo.module.css'

const OtherInfo = ({ categories, styles, materialsUsed, colors, care }) => {
  
  const { locale } = useRouter()

  const router = useRouter()

  const { handleResetFilters } = useStateContext()

  const handleNavigation = (type, value) => {
    handleResetFilters()
    router.push(`/products?${type}=${value}`)
  }

  return (
    <>
      <hr className={classes.separator} />
      <div className={classes.other_details_container}>
        <div className={classes.other_item}>
          <h4 className={classes.other_info_label}>
            {locale === 'ar-DZ' ? 'الأصناف: ' : locale === 'fr-FR' ? 'Catégories: ' : 'Categories: '}
          </h4>              
          {
            addCommasToArrayElements(categories, 'categoryName', locale).elementsToWork.map((category, index) => (
              <button key={category} onClick={() => handleNavigation('category', category)}>
                {
                  locale !== 'ar-DZ' ? capitilizeFirstLetter(addCommasToArrayElements(categories, 'categoryName', locale).elementsToDisplay[index]): addCommasToArrayElements(categories, 'categoryName', locale).elementsToDisplay[index]
                }
              </button>
            ))
          }
        </div>
        <div className={classes.other_item}>
          <h4 className={classes.other_info_label}>
            {locale === 'ar-DZ' ? 'الكلمات المفتاحية: ' : locale === 'fr-FR' ? 'Mots clés: ' : 'Tags: '}  
          </h4>      
          {
            styles.map(style => (
              <button key={style._id} onClick={() => handleNavigation('style', style.styleName.en)}>
                {locale === 'ar-DZ' ? style.styleName.ar : locale === 'fr-FR' ? capitilizeFirstLetter(style.styleName.fr) : capitilizeFirstLetter(style.styleName.en)}{', '}
              </button>
            ))
          }        
          {
            addCommasToArrayElements(colors, 'colorName', locale).elementsToWork.map((color, index) => (
              <button key={color} onClick={() => handleNavigation('color', color)}>
                {
                  locale !== 'ar-DZ' ? capitilizeFirstLetter(addCommasToArrayElements(colors, 'colorName', locale).elementsToDisplay[index]): addCommasToArrayElements(colors, 'colorName', locale).elementsToDisplay[index]
                }
              </button>
            ))
          }
        </div>
        <div className={classes.other_item}>
          <h4 className={classes.other_info_label}>
            {locale === 'ar-DZ' ? 'المواد المستعملة' : locale === 'fr-FR' ? 'Les matériaux utilisés: ' : 'Materials used: '}  
          </h4>              
          {
            addCommasToArrayElements(materialsUsed, 'materialName', locale).elementsToWork.map((material, index) => (
              <button key={material} onClick={() => handleNavigation('material', material)}>
                {
                  locale !== 'ar-DZ' ? capitilizeFirstLetter(addCommasToArrayElements(materialsUsed, 'materialName', locale).elementsToDisplay[index]): addCommasToArrayElements(materialsUsed, 'materialName', locale).elementsToDisplay[index]
                }
              </button>
            ))
          }
        </div>
        <hr className={classes.separator} />
        <div className={classes.care_container}>
          <h3>
            {locale === 'ar-DZ' ? 'التنظيف' : locale === 'fr-FR' ? 'Care' : 'Care'}
          </h3>
          <p>
            { locale === 'ar-DZ' ? care.ar : locale === 'fr-FR' ? care.fr : care.en }
          </p>   
        </div>
      </div>
    </>
  )
}

export default OtherInfo