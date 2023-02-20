import { useState } from "react";

const useInputCartDelivery = (validValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const isValid = validValue(enteredValue);
  const isInvalid = !isValid && isTouched;

  const inputHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    isValid,
    isInvalid,
    inputHandler,
    blurHandler,
    reset,
  };
};
export default useInputCartDelivery;
