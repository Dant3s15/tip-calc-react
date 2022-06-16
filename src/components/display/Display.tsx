import { FC, useRef } from 'react';
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
    errorState: {
      billHasError: boolean;
      peopleHasError: boolean;
    };
  };
}

const Display: FC<Props> = props => {
  const resetBtnRef = useRef<any>(null);
  const { data } = props;
  const { errorState, values } = data;

  const amountPerPerson = () => {
    if (errorState.billHasError || errorState.peopleHasError) {
      return '0.00';
    }
    if (values.peopleValue && values.billValue) {
      return (
        Math.floor(
          (values.billValue / values.peopleValue) *
            values?.selectedPercent! *
            100
        ) / 100
      ).toFixed(2);
    } else return (0).toFixed(2);
  };
  const amountTotal = () => {
    if (errorState.billHasError || errorState.peopleHasError) {
      return '0.00';
    }
    if (values.peopleValue && values.billValue) {
      return (
        values.billValue / values.peopleValue +
        Math.round(
          (values.billValue / values.peopleValue) *
            values.selectedPercent! *
            100
        ) /
          100
      ).toFixed(2);
    } else return (0).toFixed(2);
  };
  const resetHandler = () => {
    props.data.reset();
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
