import { types, getParent, destroy } from "mobx-state-tree";
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
    changeImage(newImage) {
      self.image = newImage;
    },
    remove() {
      getParent(self, 2).remove(self); // 2 means we want to go up two parents in the tree since once will be invoking the method remove on the items array but we want to invoke the method on WhishList
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
    remove(item) {
      destroy(item); //self.items.splice(self.items.indexOf(item), 1); Equivalent method to remove an item on the tree
    },
  }))
  .views((self) => ({
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0);
    },
  }));

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
