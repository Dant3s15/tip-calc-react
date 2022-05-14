import classes from './Display.module.scss';
const Display = () => {
  return (
    <div className={classes.display}>
      <div className={classes.results}>
        <div className={classes.amount}>
          <div className={classes['amount__title']}>
            <p>Tip Amount</p>
            <p>/ person</p>
          </div>
          <p className={classes['amount__dollars']}>$0.00</p>
        </div>
        <div className={classes.amount}>
          <div className={classes['amount__title']}>
            <p>Total</p>
            <p>/ person</p>
          </div>
          <p className={classes['amount__dollars']}>$0.00</p>
        </div>
      </div>
      <button className={`${classes.reset} ${classes.active}`}>
        <p>RESET</p>
      </button>
    </div>
  );
};

export default Display;
