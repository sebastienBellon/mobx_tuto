import { types } from "mobx-state-tree";
import Reactotron from "reactotron-react-js";
import { values } from "mobx";

export const WhishListItem = types
  .model({
    name: types.string,
    price: types.number,
    image: types.optional(types.string, ""),
  })
  .actions((self) => ({
    changeName(newName) {
      self.name = newName;
    },
    changePrice(newPrice) {
      self.price = newPrice;
    },
  }));

export const WishList = types
  .model({
    items: types.optional(types.array(WhishListItem), []),
  })
  .actions((self) => ({
    add(item) {
      self.items.push(item);
    },
  }));

// export const Todo = types
//   .model({
//     name: types.optional(types.string, ""),
//     done: types.optional(types.boolean, false),
//   })
//   .actions((self) => ({
//     setName(newName) {
//       self.name = newName;
//     },

//     toggle() {
//       self.done = !self.done;
//     },
//   }));

// export const User = types.model({
//   name: types.optional(types.string, ""),
// });

// const RootStore = types
//   .model({
//     users: types.map(User),
//     todos: types.optional(types.map(Todo), {}),
//   })
//   .views((self) => ({
//     get pendingCount() {
//       return values(self.todos).filter((todo) => !todo.done).length;
//     },
//     get completedCount() {
//       return values(self.todos).filter((todo) => todo.done).length;
//     },
//     getTodosWhereDoneIs(done) {
//       return values(self.todos).filter((todo) => todo.done === done);
//     },
//   }))
//   .actions((self) => ({
//     addTodo(id, name) {
//       self.todos.set(id, Todo.create({ name }));
//     },
//   }));

// export const store = RootStore.create({
//   users: {}, // users is not required really since arrays and maps are optional by default since MST3
// });

// // let reactotron-mst know about it
// Reactotron.trackMstNode(store);
