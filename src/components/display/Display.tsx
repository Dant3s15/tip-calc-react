import { FC } from 'react';
import classes from './Display.module.scss';

interface Props {
  data: {
    values: {
      billValue: number;
      customValue: number;
      peopleValue: number;
      selectedPercent: number;
    };
  };
}

const Display: FC<Props> = props => {
  const amountPerPerson = () => {
    if (props.data.values.peopleValue) {
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
    console.log(
      props.data.values.billValue / props.data.values.peopleValue +
        +amountPerPerson()
    );
    if (props.data.values.peopleValue) {
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
      <button className={`${classes.reset} ${classes.active}`}>
        <p>RESET</p>
      </button>
    </div>
  );
};

export default Display;
