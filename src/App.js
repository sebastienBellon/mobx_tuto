import { observer } from "mobx-react-lite";
import { values } from "mobx";

import TodoView from "./components/TodoView/TodoView";

let id = 1;
const randomId = () => ++id;

const App = observer((props) => (
  <div>
    <button onClick={(e) => props.store.addTodo(randomId(), "New Task")}>
      Add Task
    </button>
    {values(props.store.todos).map((todo, idx) => (
      <TodoView key={idx} todo={todo} />
    ))}

    <div>
      {props.store.pendingCount} pending, {props.store.completedCount} completed
    </div>
  </div>
));

export default App;
