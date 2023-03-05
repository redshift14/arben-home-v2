import classes from '../style/Loading.module.css'

const Loading = () => {
  return  (
    <div className={classes.loader}>
      <div className={classes.spinner}></div>
    </div>
  )
}

export default Loading