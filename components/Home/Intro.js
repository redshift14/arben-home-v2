import { useRouter } from 'next/router'

import { FaTruck } from 'react-icons/fa'
import { GiCash } from 'react-icons/gi'
import { MdOutlinePublishedWithChanges } from 'react-icons/md'

import classes from './Intro.module.css'

const Intro = ({ data }) => {

  const iconsArray = [
    <FaTruck className={classes.icon} />,
    <MdOutlinePublishedWithChanges  className={classes.icon}/>,
    <GiCash className={classes.icon} />
  ]

  const { locale } = useRouter()

  return (
    <section className={classes.main}>
      {
        data.length === 3 && data.map((cardInfo, index) => {
          const { _key, introMainText, introSecondaryText } = cardInfo 
          return (
            <div className={classes.card} key={_key}>
              { iconsArray[index] }
              <div className={classes.text}>
                <h3>
                  { 
                    locale == 'fr-FR' ? introMainText.fr : locale == 'ar-DZ' ? introMainText.ar : introMainText.en
                  }
                </h3>          
                <h4>
                  {
                    locale == 'fr-FR' ? introSecondaryText.fr : locale == 'ar-DZ' ? introSecondaryText.ar : introSecondaryText.en
                  }
                </h4>
              </div>
            </div>
          )
        })
      }
    </section>
  )
}

export default Intro