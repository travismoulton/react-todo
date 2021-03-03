import React from "react";
import TodoItem from "./TodoItem/TodoItem";

const Todos = (props) => {
  return (
    <ul>
      {props.todos.map((todo, i) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          todo={todo.todo}
          date={todo.date}
          category={todo.category}
          removeTodo={props.removeTodo}
        />
      ))}
    </ul>
  );
};

export default Todos;
