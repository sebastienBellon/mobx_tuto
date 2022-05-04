import { types, getParent, destroy } from "mobx-state-tree";

export const WishListItem = types
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
    items: types.optional(types.array(WishListItem), []),
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
