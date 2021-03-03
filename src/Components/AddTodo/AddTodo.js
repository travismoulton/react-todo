import { useState } from "react";

import classes from "./AddTodo.module.css";
import useHttp from "../../hooks/http";

const AddTodo = (props) => {
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const { sendRequest } = useHttp();

  const addTodoHandler = (todo) => {
    sendRequest(
      "https://todos-30510-default-rtdb.firebaseio.com/todos.json",
      "POST",
      JSON.stringify(todo),
      true
    );
  };

  const updateTodoHandler = (e) => {
    setTodo(e.target.value);
  };

  const updateDateHandler = (e) => {
    setDate(new Date(e.target.value));
  };

  const submitTodoHandler = (todo) => {
    addTodoHandler({ todo });
    props.history.push("/");
  };

  const updateCategoryHandler = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className={classes.AddTodo}>
      <input
        type="text"
        placeholder="Todo"
        value={todo}
        onChange={updateTodoHandler}
      />
      <input type="date" onChange={updateDateHandler} />
      <input
        type="text"
        value={category}
        onChange={updateCategoryHandler}
        placeholder="category"
      />
      <button onClick={() => submitTodoHandler(todo)}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
