import { urlFor, client } from "../../lib/client"
import AboutPage from "../../components/About/AboutPage"

const About = ({ layoutInfo }) => {
  return (
    <AboutPage imageSrc={urlFor(layoutInfo.aboutPageShowcaseImage).url()} />
  )
}

export default About

export const getStaticProps = async () => {
  const layoutQuery = '*[_type == "layout"]{aboutPageShowcaseImage}[0]'

  const layoutInfo = await client.fetch(layoutQuery) 

  return {
    props: { layoutInfo }
  }
}