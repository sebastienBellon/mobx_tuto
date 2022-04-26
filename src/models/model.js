import { types } from "mobx-state-tree";
import Reactotron from "reactotron-react-js";

export const Todo = types
  .model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setName(newName) {
      self.name = newName;
    },

    toggle() {
      self.done = !self.done;
    },
  }));

export const User = types.model({
  name: types.optional(types.string, ""),
});

const RootStore = types
  .model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {}),
  })
  .actions((self) => ({
    addTodo(id, name) {
      self.todos.set(id, Todo.create({ name }));
    },
  }));

export const store = RootStore.create({
  users: {}, // users is not required really since arrays and maps are optional by default since MST3
});

// let reactotron-mst know about it
Reactotron.trackMstNode(store);
