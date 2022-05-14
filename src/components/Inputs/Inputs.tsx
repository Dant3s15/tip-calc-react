import personIco from '../../images/icon-person.svg';
import dollarIco from '../../images/icon-dollar.svg';
import classes from './Inputs.module.scss';
const Inputs = () => {
  return (
    <div className={classes.inputs}>
      <div className={classes.block}>
        <div className={classes.title}>
          <label htmlFor='bill'>Bill</label>
          <p>Can't be zero</p>
        </div>
        <input min='0.01' type='number' name='bill' id='bill' placeholder='0' />
        <img src={dollarIco}></img>
      </div>
      <div className={classes.block}>
        <p className={classes.title}>Select Tip %</p>
        <div className={classes['percentages__buttons']}>
          <button className={classes.selected} data-percent='5'>
            5%
          </button>
          <button data-percent='10'>10%</button>
          <button data-percent='15'>15%</button>
          <button data-percent='25'>25%</button>
          <button data-percent='50'>50%</button>
          <input type='number' name='custom' id='custom' placeholder='Custom' />
        </div>
      </div>
      <div className={classes.block}>
        <div className={classes.title}>
          <label htmlFor='people'>Number of People</label>
          <p>Can't be zero</p>
        </div>
        <input
          className={classes['input-error']}
          min='1'
          type='number'
          name='people'
          id='people'
          placeholder='0'
        />
        <img src={personIco}></img>
      </div>
    </div>
  );
};

export default Inputs;
