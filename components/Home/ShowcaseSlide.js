import classes from './ShowcaseSlide.module.css'

const ShowcaseSlide = ({ imageSrc, titleText, subtitleText }) => {
  return (
    <div className={classes.main} style={{ backgroundImage: `url('${imageSrc}')` }}>
      <h1 className={classes.title}>{titleText}</h1>
      <h2 className={classes.subtitle}>{subtitleText}</h2>
      <button className={classes.button}>Shop Now</button>
    </div>
  )
}

export default ShowcaseSlide