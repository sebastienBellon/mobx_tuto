import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { getSnapshot } from "mobx-state-tree";
import { store } from "./models/model";

store.addTodo(1, "Eat a cake");
store.todos.get(1).toggle();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<div>{JSON.stringify(getSnapshot(store))}</div>);
