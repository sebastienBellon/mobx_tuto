import React from "react";
import { useObserver } from "mobx-react-lite";

const TodoView = (props) => {
  return useObserver(() => (
    <div>
      <input
        type="checkbox"
        checked={props.todo.done}
        onChange={(e) => props.todo.toggle()}
      />
      <input
        type="text"
        value={props.todo.name}
        onChange={(e) => props.todo.setName(e.target.value)}
      />
    </div>
  ));
};

export default TodoView;
