import { useEffect, useState } from "react";

import AddTodoForm from "./AddTodoForm/AddTodoForm";
import classes from "./AddTodo.module.css";
import useHttp from "../../hooks/http";

const AddTodo = (props) => {
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(false);
  const { sendRequest } = useHttp();

  const addTodoHandler = (todoItem) => {
    sendRequest(
      "https://todos-30510-default-rtdb.firebaseio.com/todos.json",
      "POST",
      JSON.stringify(todoItem),
      true
    );
  };

  const updateTodoHandler = (e) => {
    setTodo(e.target.value);
  };

  const updateDateHandler = (e) => {
    setDate(new Date(e.target.value).toISOString().substr(0, 10));
  };

  const submitTodoHandler = () => {
    addTodoHandler({ todo, date, category });
    props.history.push("/");
  };

  const updateCategoryHandler = (e) => {
    setCategory(e.target.value);
    if (e.target.value === "#addNewCategory") setShow(true);
  };

  const backdropStateHandler = () => {
    setShow(false);
  };

  return (
    <div className={classes.AddTodo}>
      <AddTodoForm
        todoValue={todo}
        todoOnChange={updateTodoHandler}
        dateValue={date}
        dateOnChange={updateDateHandler}
        categoryValue={category}
        categoryOnChange={updateCategoryHandler}
        show={show}
        backdropHandler={backdropStateHandler}
      />
      <button onClick={() => submitTodoHandler(todo)}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
