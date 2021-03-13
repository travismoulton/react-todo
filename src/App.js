import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Todo from "./Containers/Todo/Todo";
import AddTodo from "./Components/AddTodo/AddTodo";
import EditTodo from "./Components/AddTodo/EditTodo/EditTodo";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/add-todo" component={AddTodo} />
        <Route path="/edit-todo/:id" component={EditTodo} />
        <Route path="/" component={Todo} />
      </Switch>
    </div>
  );
}

export default App;
