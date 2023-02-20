import classes from "./Delivery.module.css";
import useInputCartDelivery from "../../hooks/use-input";

const Delivery = (props) => {
  const isNotEmpty = (value) => value.trim().length > 1;
  const isFiveChars = (value) => value.trim().length === 5;
  const isNonNegative = (value) => value.trim() >= 0;
  const {
    enteredValue: enteredName,
    isValid: nameIsValid,
    isInvalid: nameIsInvalid,
    inputHandler: nameInputHandler,
    blurHandler: nameBlurHandler,
    reset: resetName,
  } = useInputCartDelivery(isNotEmpty);

  const {
    enteredValue: enteredAddress,
    isValid: addressIsValid,
    isInvalid: addressIsInvalid,
    inputHandler: addressInputHandler,
    blurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInputCartDelivery(isNotEmpty);

  const {
    enteredValue: enteredPostal,
    isValid: postalIsValid,
    isInvalid: postalIsInvalid,
    inputHandler: postalInputHandler,
    blurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useInputCartDelivery(isFiveChars);

  const {
    enteredValue: enteredNumOfCutlery,
    isValid: numOfCutleryIsValid,
    isInvalid: numOfCutleryIsInvalid,
    inputHandler: numOfCutleryInputHandler,
    blurHandler: numOfCutleryBlurHandler,
    reset: resetNumOfCutlery,
  } = useInputCartDelivery(isNonNegative);

  let formIsValid = false;
  if (nameIsValid && addressIsValid && postalIsValid && numOfCutleryIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;

    ///////////////////////////////////////////////////////////
    console.log("Order accepted");
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      postalCode: enteredPostal,
      numOfCutlery: enteredNumOfCutlery,
    });
    ////////////////////////////////////////////////////////////////
    resetName();
    resetAddress();
    resetPostal();
    resetNumOfCutlery();
  };

  const nameControlClasses = `${classes.control} ${
    nameIsInvalid ? classes.invalid : ""
  }`;
  const addressControlClasses = `${classes.control} ${
    addressIsInvalid ? classes.invalid : ""
  }`;
  const postalControlClasses = `${classes.control} ${
    postalIsInvalid ? classes.invalid : ""
  }`;
  const cutleryControlClasses = `${classes.control} ${
    numOfCutleryIsInvalid ? classes.invalid : ""
  }`;
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputHandler}
          onBlur={nameBlurHandler}
        />
        {nameIsInvalid && (
          <p className={classes["error-text"]}>Please type your name</p>
        )}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Your address</label>
        <input
          type="text"
          id="address"
          value={enteredAddress}
          onChange={addressInputHandler}
          onBlur={addressBlurHandler}
        />
        {addressIsInvalid && (
          <p className={classes["error-text"]}>Please type your adress</p>
        )}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postalcode">Your postal code</label>
        <input
          type="number"
          id="postalcode"
          value={enteredPostal}
          onChange={postalInputHandler}
          onBlur={postalBlurHandler}
        />
        {postalIsInvalid && (
          <p className={classes["error-text"]}>
            Postal code must consist of 5 characters
          </p>
        )}
      </div>
      <div className={cutleryControlClasses}>
        <label htmlFor="numcutlery">Number of cutlery</label>
        <input
          type="number"
          id="numcutlery"
          value={enteredNumOfCutlery}
          onChange={numOfCutleryInputHandler}
          onBlur={numOfCutleryBlurHandler}
        />
        {numOfCutleryIsInvalid && (
          <p className={classes["error-text"]}>
            Please type a non-negative number
          </p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          className={classes.submit}
          type="submit"
          disabled={!formIsValid}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};
export default Delivery;
