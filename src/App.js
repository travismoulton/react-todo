import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Todo from "./Containers/Todo/Todo";
import AddTodo from "./Components/AddTodo/AddTodo";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/add-todo" component={AddTodo} />
        <Route path="/" component={Todo} />
      </Switch>
    </div>
  );
}

export default App;
