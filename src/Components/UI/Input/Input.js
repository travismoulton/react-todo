import { useEffect, useRef } from "react";

const Input = (props) => {
  let inputElement = null;
  let inputEl = useRef(null);

  useEffect(() => {
    props.reference && inputEl.current.focus();
  });

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          ref={inputEl}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <p>Something went wrong</p>;
  }

  return <div>{inputElement}</div>;
};

export default Input;
