import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  return (
    <div className={classes.Backdrop} onClick={props.clicked}>
      {props.children}
    </div>
  );
};

export default Backdrop;
