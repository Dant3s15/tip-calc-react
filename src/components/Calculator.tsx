import { MutableRefObject, useState } from 'react';
import classes from './Calculator.module.scss';
import Display from './display/Display';
import Inputs from './Inputs/Inputs';
const Calculator = () => {
  const [billValue, setBillValue] = useState<number | null>(0);
  const [customValue, setCustomValue] = useState<number | null>(0);
  const [peopleValue, setPeopleValue] = useState<number | null>(0);
  const [selectedPercent, setSelectedPercent] = useState<number | null>(0);
  const [isSelected, setIsSelected] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [billHasError, setBillHasError] = useState(false);
  const [peopleHasError, setPeopleHasError] = useState(false);

  const [inputRefsObj, setInputRefsObj] = useState([]);
  const [customRefObj, setCustomRefObj] = useState<{
    ref: MutableRefObject<any>;
    classList: string;
  }>();
  const [buttonRefs, setButtonRefs] = useState<{ arr: []; classList: string }>({
    arr: [],
    classList: '',
  });

  const getInputsRefs = (arr: []) => {
    setInputRefsObj(arr);
    return arr;
  };
  const getCustomRef = (ref: MutableRefObject<any>, classList: string) => {
    setCustomRefObj({ ref, classList });
  };
  const getButtonRefs = (arr: [], classList: any) => {
    setButtonRefs({ arr, classList });
    return { arr, classList };
  };

  const reset = () => {
    setBillValue(0);
    setCustomValue(0);
    setPeopleValue(0);
    setSelectedPercent(0);
    setIsSelected(false);
    inputRefsObj.forEach((ref: MutableRefObject<any>) => {
      ref.current.value = null;
    });

    buttonRefs['arr'].forEach((ref: MutableRefObject<any>) => {
      ref.current.classList.remove(buttonRefs['classList']);
    });
    customRefObj?.ref.current.classList.remove(customRefObj.classList);
    setIsButtonActive(false);
    setBillHasError(false);
    setPeopleHasError(false);
  };

  return (
    <div className={classes.calculator}>
      <h1 className={classes['main-title']}>
        SPLI<br></br>TTER
      </h1>
      <div className={classes['calc-window']}>
        <Inputs
          data={{
            values: {
              billValue,
              customValue,
              peopleValue,
              selectedPercent,
            },
            isSelected,
            setIsSelected,
            setters: [
              setBillValue,
              setCustomValue,
              setPeopleValue,
              setSelectedPercent,
            ],
            getInputsRefs,
            getButtonRefs,
            getCustomRef,
            setIsButtonActive,
            errorState: {
              billHasError,
              setBillHasError,
              peopleHasError,
              setPeopleHasError,
            },
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
            errorState: {
              billHasError,
              peopleHasError,
            },
            isButtonActive,
            reset,
          }}
        />
      </div>
    </div>
  );
};

export default Calculator;
