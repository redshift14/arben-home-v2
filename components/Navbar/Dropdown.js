import Link from 'next/link'
import { useRouter } from 'next/router'

import navClasses from './Dropdown.module.css'
import sideClasses from './DropdownSidebar.module.css'

const Dropdown = ({ links, sidebar }) => {

  const { locale } = useRouter()

  const { main, link_container, link, link_ar } = sidebar ? sideClasses : navClasses

  return (
    <div className={main}>
      {
        links.map((l, index) => (
          <Link href={l.to} key={index} className={link_container}>
            <button className={locale == 'ar-DZ' ? `${link} ${link_ar}` : link}>
              {
                locale == 'fr-FR' ? l.name.fr : locale == 'ar-DZ' ? l.name.ar : l.name.en
              }
            </button>
          </Link>
        ))
      }
    </div>
  )
}

export default Dropdown