import { useRouter } from 'next/router'
import classes from './RecentProducts.module.css'
import ProductCard from '../ProductCard'

import testImage from '../../public/assets/lh_nara_wisteria_ss_h1.jpg'

const RecentProducts = () => {

  const { locale } = useRouter()

  return (
    <section className={classes.main}>
      <h2>
        {
          locale == 'fr-FR' ? 'Produits Recents' : 
          locale == 'ar-DZ' ? 'أحدث المنتجات' : 
          'Recent Products'
        }
      </h2>
      <div className={classes.cards}>
        <ProductCard 
          title={'Nara bluestone bamboo cotton 400TC'}
          startingPrice={146.99}
          sizes={['230 X 254', '230 X 254', '230 X 254', '230 X 254', '230 X 254']}
          coverImage={testImage}
        />
        <ProductCard 
          title={'Nara bluestone bamboo cotton 400TC'}
          startingPrice={146.99}
          sizes={['230 X 254', '230 X 254', '230 X 254', '230 X 254', '230 X 254']}
          coverImage={testImage}
        />
        <ProductCard 
          title={'Nara bluestone bamboo cotton 400TC'}
          startingPrice={146.99}
          sizes={['230 X 254', '230 X 254', '230 X 254', '230 X 254', '230 X 254']}
          coverImage={testImage}
        />
        <ProductCard 
          title={'Nara bluestone bamboo cotton 400TC'}
          startingPrice={146.99}
          sizes={['230 X 254', '230 X 254', '230 X 254', '230 X 254', '230 X 254']}
          coverImage={testImage}
        />
        <ProductCard 
          title={'Nara bluestone bamboo cotton 400TC'}
          startingPrice={146.99}
          sizes={['230 X 254', '230 X 254', '230 X 254', '230 X 254', '230 X 254']}
          coverImage={testImage}
        />
      </div>
    </section>
  )
}

export default RecentProducts