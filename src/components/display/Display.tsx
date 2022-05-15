import { FC, useEffect, useRef, useState } from 'react';
import classes from './Display.module.scss';

interface Props {
  data: {
    values: {
      billValue: number | null;
      customValue: number | null;
      peopleValue: number | null;
      selectedPercent: number | null;
    };
    isButtonActive: boolean;
    reset: () => void;
  };
}

const Display: FC<Props> = props => {
  const resetBtnRef = useRef<any>(null);

  useEffect(() => {}, []);

  const amountPerPerson = () => {
    if (
      props.data.values.peopleValue &&
      props.data.values.billValue &&
      props.data.values.selectedPercent
    ) {
      return (
        Math.floor(
          (props.data.values.billValue / props.data.values.peopleValue) *
            props.data.values.selectedPercent *
            100
        ) / 100
      ).toFixed(2);
    } else return (0).toFixed(2);
  };
  const amountTotal = () => {
    if (
      props.data.values.peopleValue &&
      props.data.values.billValue &&
      props.data.values.selectedPercent
    ) {
      return (
        props.data.values.billValue / props.data.values.peopleValue +
        Math.round(
          (props.data.values.billValue / props.data.values.peopleValue) *
            props.data.values.selectedPercent *
            100
        ) /
          100
      ).toFixed(2);
    } else return (0).toFixed(2);
  };
  const resetHandler = () => {
    props.data.reset();

    // resetBtnRef.current.classList.remove(classes.active);
  };

  return (
    <div className={classes.display}>
      <div className={classes.results}>
        <div className={classes.amount}>
          <div className={classes['amount__title']}>
            <p>Tip Amount</p>
            <p>/ person</p>
          </div>
          <p className={classes['amount__dollars']}>${amountPerPerson()}</p>
        </div>
        <div className={classes.amount}>
          <div className={classes['amount__title']}>
            <p>Total</p>
            <p>/ person</p>
          </div>
          <p className={classes['amount__dollars']}>${amountTotal()}</p>
        </div>
      </div>
      <button
        ref={resetBtnRef}
        onClick={resetHandler}
        className={`${classes.reset} ${
          props.data.isButtonActive ? classes.active : ''
        }`}
      >
        RESET
      </button>
    </div>
  );
};

export default Display;
