import { useState } from 'react';
import classes from './Calculator.module.scss';
import Display from './display/Display';
import Inputs from './Inputs/Inputs';
const Calculator = () => {
  const [billValue, setBillValue] = useState<number>(0);
  const [customValue, setCustomValue] = useState<number>(0);
  const [peopleValue, setPeopleValue] = useState<number>(0);
  const [selectedPercent, setSelectedPercent] = useState<number>(0);
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className={classes.calculator}>
      <h1 className={classes['main-title']}>
        SPLI<br></br>TTER
      </h1>
      <div className={classes['calc-window']}>
        <Inputs
          data={{
            billValue,
            customValue,
            peopleValue,
            selectedPercent,
            isSelected,
            setIsSelected,
            setters: [
              setBillValue,
              setCustomValue,
              setPeopleValue,
              setSelectedPercent,
            ],
          }}
        />
        <Display
          data={{
            values: {
              billValue,
              customValue,
              peopleValue,
              selectedPercent,
            },
          }}
        />
      </div>
    </div>
  );
};

export default Calculator;
