import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'

import Image from 'next/image'
import Link from 'next/link'

import { AiOutlineHome } from 'react-icons/ai'

import Logo from '../../public/assets/logoSmall.webp'

import LanguageSelect from './LanguageSelect'

const NavItems = dynamic(() => import('./NavItems'))
// const LanguageSelect = dynamic(() => import('./LanguageSelect'))
const Sidebar = dynamic(() => import('./Sidebar'))
const CustomCart = dynamic(() => import('../Cart/Cart'))

const SidebarIcon = dynamic(() => import('./SidebarIcon'))
const CartIcon = dynamic(() => import('../Cart/CartIcon'))

import classes from './Navbar.module.css'

const Navbar = () => {

  const { locale } = useRouter()

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset)
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /////////////////////////////////////////////////////////////////////////////

  const [showSidebar, setShowSidebar] = useState(false)

  const sidebarRef = useRef()
  const sidebarIconRef = useRef()

  useEffect(() => {
    const handleClickOutsideSidebar = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) &&
      sidebarIconRef.current && !sidebarIconRef.current.contains(e.target)) {
        setShowSidebar(false)
      }
    }
    document.addEventListener('click', handleClickOutsideSidebar)

    return () => {
      document.removeEventListener('click', handleClickOutsideSidebar)
    }
  }, [sidebarRef, sidebarIconRef])

  const handleCloseSidebar = () => {
    setShowSidebar(false)
  }
  const handleShowSidebar = () => {
    setShowSidebar(true)
  }

  /////////////////////////////////////////////////////////////////////////////

  const [showCartMenu, setShowCartMenu] = useState(false)
  
  const cartMenuRef = useRef()
  const cartMenuIconRef = useRef()

  useEffect(() => {
    const handleClickOutsideCartMenu = (e) => {
      if (cartMenuRef.current && !cartMenuRef.current.contains(e.target) &&
      cartMenuIconRef.current && !cartMenuIconRef.current.contains(e.target)) {
        setShowCartMenu(false)
      }
    }
    document.addEventListener('click', handleClickOutsideCartMenu)

    return () => {
      document.removeEventListener('click', handleClickOutsideCartMenu)
    }
  }, [cartMenuRef, cartMenuRef])

  const handleCloseCartMenu = () => {
    setShowCartMenu(false)
  }

  const handleShowCart = () => {
    setShowCartMenu(true)
  }

  /////////////////////////////////////////////////////////////////////////////

  const [windowWidth, setWindowWidth] = useState()

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }

  },[windowWidth])

  /////////////////////////////////////////////////////////////////////////////

  return (
    <div className={offset > 65 ? `${classes.main} ${classes.shadow}` : classes.main}>

      {
        windowWidth > 500 && 
        <SidebarIcon sidebarIconRef={sidebarIconRef} handleShowSidebar={handleShowSidebar} />
      }

      <div 
        ref={sidebarRef}
        className={locale === 'ar-DZ' ? (showSidebar ? classes.sidebar_container_ar : `${classes.sidebar_container_hidden_ar} ${classes.sidebar_container_ar}`) : (showSidebar ? classes.sidebar_container : `${classes.sidebar_container} ${classes.sidebar_container_hidden}`)} 
      >
        <Sidebar handleClose={handleCloseSidebar}  />
      </div>

      <nav className={classes.nav}>
        <NavItems />
      </nav>

      <div className={classes.logo_container}>
        <Link href={'/'}>
          <Image src={Logo} alt='logo' priority />
        </Link>
      </div>

      <div className={classes.controllers_container}>
        <LanguageSelect />
        {
          windowWidth > 500 && 
          <div className={classes.cart_icon_container}>
            <CartIcon cartMenuIconRef={cartMenuIconRef} handleShowCart={handleShowCart} />
          </div>
        }
      </div>

      <div 
        ref={cartMenuRef}
        className={locale === 'ar-DZ' ? (showCartMenu ? classes.cart_menu_container_ar : `${classes.cart_menu_container_hidden_ar} ${classes.cart_menu_container_ar}`) :(showCartMenu ? classes.cart_menu_container : `${classes.cart_menu_container} ${classes.cart_menu_container_hidden}` ) } 
      >
        <CustomCart handleClose={handleCloseCartMenu} />
      </div>

      <div className={classes.bottom_bar}> 
        {
          windowWidth <= 500 &&
          <SidebarIcon sidebarIconRef={sidebarIconRef} handleShowSidebar={handleShowSidebar} />
        }
        <AiOutlineHome className={classes.bottom_bar_icon} />
        {
          windowWidth <= 500 && 
          <CartIcon handleShowCart={handleShowCart} cartMenuIconRef={cartMenuIconRef} />
        }
      </div>
      { showCartMenu && <div className={classes.overlay}></div> }
      { showSidebar && <div className={classes.overlay}></div> }
    </div>
  )
}

export default Navbar