import { useRouter } from 'next/router'

import classes from './Tabs.module.css'

const InfoTab = ({ care, materialsUsed }) => {

  const { locale } = useRouter()

  return (
    <div className={classes.info_container}>
      <div className={classes.titles}>
        <h5>
          { locale === 'ar-DZ' ? 'تعليمات العناية' : locale === 'fr-FR' ? 'Se soucier' : 'Care' }
        </h5>
        <h5>
          { locale === 'ar-DZ' ? 'المواد المستعملة' : locale === 'fr-FR' ? 'Les Matériaux Utilisés' : 'Materials Used' }
        </h5>
      </div>
      <div className={classes.info}>
        <h6>
          { locale === 'ar-DZ' ? care.ar : locale === 'fr-FR' ? care.fr : care.en }
        </h6>
        <div className={classes.material_container}>
          {
            materialsUsed.map((m, index) => (
              <h6 key={index}>
                {locale === 'ar-DZ' ? m.materialName.ar : locale === 'fr-FR' ? m.materialName.fr : m.materialName.en }{','}
              </h6>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default InfoTab