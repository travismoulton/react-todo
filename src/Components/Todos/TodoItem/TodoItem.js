import { Link } from "react-router-dom";
import classes from "./TodoItem.module.css";

const TodoItem = (props) => {
  return (
    <li className={classes.TodoItem}>
      <span>
        {props.todo}, {props.date}, {props.category}
      </span>
      <span>
        <button onClick={() => props.removeTodo(props.id)}>
          Mark as complete
        </button>
        <Link
          to={{
            pathanme: `/edit-todo/${props.id}`,
            state: {
              id: props.id,
              todo: props.todo,
              date: props.date,
              category: props.category,
            },
          }}
        >
          Edit todo item
        </Link>
        {/* <Link to={`edit-todo/${props.id}`}>Edit Todo</Link> */}
      </span>
    </li>
  );
};

export default TodoItem;
