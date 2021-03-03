import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import Todos from "../../Components/Todos/Todos";
import classes from "./Todo.module.css";
import useHttp from "../../hooks/http";

const Todo = (props) => {
  const [todos, setTodos] = useState([]);
  const { data, sendRequest, reFetch, initialFetch } = useHttp();

  const fetchTodos = useCallback(() => {
    sendRequest(
      "https://todos-30510-default-rtdb.firebaseio.com/todos.json",
      "GET",
      null,
      false
    );
  }, [sendRequest]);

  useEffect(() => {
    if (initialFetch || reFetch) fetchTodos();
  }, [fetchTodos, reFetch, initialFetch]);

  useEffect(() => {
    if (data) {
      const loadedTodos = [];
      for (const key in data) {
        loadedTodos.push({
          id: key,
          todo: data[key].todo,
        });
      }
      setTodos(loadedTodos);
    }
  }, [setTodos, data]);

  const removeTodoHandler = (key) => {
    sendRequest(
      `https://todos-30510-default-rtdb.firebaseio.com/todos/${key}.json`,
      "DELETE",
      key,
      false
    );

    setTodos(todos.filter((todo) => todo.id !== key));
  };

  return (
    <div className={classes.Todo}>
      <h1>Travis's Todo App</h1>
      <Link to="/add-todo">Add Todo</Link>
      <Todos todos={todos} removeTodo={removeTodoHandler} />
    </div>
  );
};

export default Todo;
