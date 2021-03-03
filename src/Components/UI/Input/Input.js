const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = <input {...props.elementConfig} value={props.value} />;
      break;
    default:
      inputElement = <p>Something went wrong</p>;
  }

  return { inputElement };
};
