import classes from './Calculator.module.scss';
import Display from './display/display';
import Inputs from './Inputs/Inputs';
const Calculator = () => {
  return (
    <div className={classes.calculator}>
      <h1 className={classes['main-title']}>
        SPLI<br></br>TTER
      </h1>
      <div className={classes['calc-window']}>
        <Inputs></Inputs>
        <Display></Display>
      </div>
    </div>
  );
};

export default Calculator;
