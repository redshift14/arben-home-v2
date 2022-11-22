import Link from 'next/link'
import navClasses from './Dropdown.module.css'
import sideClasses from './DropdownSidebar.module.css'

const Dropdown = ({ links, sidebar }) => {

  const { main, link_container, link } = sidebar ? sideClasses : navClasses

  return (
    <div className={main}>
      {
        links.map((l, index) => (
          <Link href={'/'} key={index} className={link_container}>
            <button className={link}>{l.name.en}</button>
          </Link>
        ))
      }
    </div>
  )
}

export default Dropdown