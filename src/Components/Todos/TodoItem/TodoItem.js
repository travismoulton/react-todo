import classes from "./TodoItem.module.css";

const TodoItem = (props) => {
  return (
    <li className={classes.TodoItem} onClick={() => props.removeTodo(props.id)}>
      {props.todo}, {props.date}, {props.category}
    </li>
  );
};

export default TodoItem;
