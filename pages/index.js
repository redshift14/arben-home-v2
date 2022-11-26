import Showcase from '../components/Home/Showcase'
import Intro from '../components/Home/Intro'
import RecentProducts from '../components/Home/RecentProducts'
import Categories from '../components/Home/Categories'
import AboutSection from '../components/Home/AboutSection'

const Home = () => {
  return (
    <>
      <Showcase />
      <Intro />
      <RecentProducts />
      <Categories />
      <AboutSection />
    </>
  )
}

export default Home