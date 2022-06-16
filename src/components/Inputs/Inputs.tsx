import personIco from '../../images/icon-person.svg';
import dollarIco from '../../images/icon-dollar.svg';
import classes from './Inputs.module.scss';
import { useRef, FC, MutableRefObject, useState, useEffect } from 'react';

interface Props {
  data: {
    values: {
      billValue: number | null;
      customValue: number | null;
      peopleValue: number | null;
      selectedPercent: number | null;
    };
    isSelected: boolean;
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
    setters: [
      setBillValue: React.Dispatch<React.SetStateAction<number | null>>,
      setCustomValue: React.Dispatch<React.SetStateAction<number | null>>,
      setPeopleValue: React.Dispatch<React.SetStateAction<number | null>>,
      setSelectedPercent: React.Dispatch<React.SetStateAction<number | null>>
    ];
    getInputsRefs: Function;
    getButtonRefs: Function;
    getCustomRef: Function;
    setIsButtonActive: Function;
    errorState: {
      billHasError: boolean;
      peopleHasError: boolean;
      setBillHasError: React.Dispatch<React.SetStateAction<boolean>>;
      setPeopleHasError: React.Dispatch<React.SetStateAction<boolean>>;
    };
  };
}

const Inputs: FC<Props> = props => {
  const [isBillTouched, setIsBillTouched] = useState(false);

  const [isPeopleTouched, setIsPeopleTouched] = useState(false);

  const billRef = useRef<any>();
  const customRef = useRef<any>();
  const peopleRef = useRef<any>();

  const percent5Ref = useRef<any>();
  const percent10Ref = useRef<any>();
  const percent15Ref = useRef<any>();
  const percent25Ref = useRef<any>();
  const percent50Ref = useRef<any>();

  const propsArr = [
    percent5Ref,
    percent10Ref,
    percent15Ref,
    percent25Ref,
    percent50Ref,
  ];
  useEffect(() => {
    props.data.getInputsRefs([billRef, customRef, peopleRef]);
    props.data.getButtonRefs(propsArr, classes.selected);
    props.data.getCustomRef(customRef, classes['selected-custom']);
  }, []);
  function isWhole(n: string) {
    return /^\d+$/.test(n);
  }

  const changeHandler = (ref: MutableRefObject<any>, setterNmb: number) => {
    props.data.setIsButtonActive(true);

    if (ref === billRef) {
      if (+ref?.current.value <= 0) {
        props.data.errorState.setBillHasError(true);
        document.documentElement.style.setProperty(
          '--bill-error-content',
          `"Can't be zero"`
        );
      } else if (+ref?.current.value > 9999) {
        ref.current.value = 99999;
        document.documentElement.style.setProperty(
          '--bill-error-content',
          `"Can't be > 9999"`
        );
        props.data.errorState.setBillHasError(true);
      } else {
        props.data.errorState.setBillHasError(false);
      }
      setIsBillTouched(true);
    }
    if (ref === peopleRef) {
      peopleRef.current.value = Math.trunc(+peopleRef.current.value);
      if (+ref?.current.value < 1) {
        props.data.errorState.setPeopleHasError(true);
        document.documentElement.style.setProperty(
          '--people-error-content',
          `"Can't be zero"`
        );
      } else if (+ref?.current.value > 9999) {
        ref.current.value = 99999;
        document.documentElement.style.setProperty(
          '--people-error-content',
          `"Can't be > 9999"`
        );
        props.data.errorState.setPeopleHasError(true);
      } else {
        props.data.errorState.setPeopleHasError(false);
      }
      // props.data.setters[2](+peopleRef.current.value);
      setIsPeopleTouched(true);
    }
    if (ref === customRef) {
      customRef.current.classList.add(classes['selected-custom']);
      propsArr.forEach(ref => {
        ref.current.classList.remove(classes.selected);
      });
      if (+customRef.current.value > 100) {
        customRef.current.value = 100;

        props.data.setters[3](100 / 100);
      } else if (+customRef.current.value < 0) {
        props.data.setters[3](0);
        customRef.current.value = 0;
      } else {
        props.data.setters[3](+customRef.current.value / 100);
      }
    }
    props.data.setters[setterNmb](+ref?.current.value / 100);
  };

  const selectionHandler = (ref: MutableRefObject<any>) => {
    props.data.setIsButtonActive(true);
    props.data.setIsSelected(true);
    propsArr.forEach(ref => {
      ref.current.classList.remove(classes.selected);
    });
    customRef.current.classList.remove(classes['selected-custom']);
    ref.current.classList.add(classes.selected);
    props.data.setters[3](+ref.current.dataset.percent / 100);
    customRef.current.value = null;
  };

  return (
    <div className={classes.inputs}>
      <div className={classes.block}>
        <label
          className={`${classes.title} ${
            isBillTouched && props.data.errorState.billHasError
              ? classes['input-error']
              : ''
          } ${classes['bill-label']}`}
          htmlFor='bill'
        >
          Bill
        </label>
        <input
          onChange={() => {
            changeHandler(billRef, 0);
          }}
          ref={billRef}
          min='0.01'
          max='9999'
          type='number'
          name='bill'
          id='bill'
          placeholder='0'
        />
        <img src={dollarIco} alt='dollar sign'></img>
      </div>
      <div className={classes.block}>
        <p className={classes.title}>Select Tip %</p>
        <div className={classes['percentages__buttons']}>
          <button
            ref={percent5Ref}
            onClick={() => {
              selectionHandler(percent5Ref);
            }}
            data-percent='5'
          >
            5%
          </button>
          <button
            ref={percent10Ref}
            onClick={() => {
              selectionHandler(percent10Ref);
            }}
            data-percent='10'
          >
            10%
          </button>
          <button
            ref={percent15Ref}
            onClick={() => {
              selectionHandler(percent15Ref);
            }}
            data-percent='15'
          >
            15%
          </button>
          <button
            ref={percent25Ref}
            onClick={() => {
              selectionHandler(percent25Ref);
            }}
            data-percent='25'
          >
            25%
          </button>
          <button
            ref={percent50Ref}
            onClick={() => {
              selectionHandler(percent50Ref);
            }}
            data-percent='50'
          >
            50%
          </button>
          <input
            ref={customRef}
            onChange={() => {
              changeHandler(customRef, 3);
            }}
            type='number'
            name='custom'
            id='custom'
            max='100'
            placeholder='Custom'
          />
        </div>
      </div>
      <div className={classes.block}>
        <label
          className={`${classes.title} ${
            isPeopleTouched && props.data.errorState.peopleHasError
              ? classes['input-error']
              : ''
          } ${classes['people-label']}`}
          htmlFor='people'
        >
          Number of People
        </label>
        <input
          ref={peopleRef}
          onChange={() => {
            changeHandler(peopleRef, 2);
          }}
          min='1'
          type='number'
          name='people'
          id='people'
          step='1'
          placeholder='0'
        />
        <img src={personIco} alt='person icon'></img>
      </div>
    </div>
  );
};

export default Inputs;
