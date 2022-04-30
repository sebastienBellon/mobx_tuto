import { WhishListItem, WishList } from "./WhishList";
import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";

it("can create an instance of a model", () => {
  const item = WhishListItem.create({
    name: "Chronicles of seb",
    price: 28.73,
    image: " https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL",
  });

  expect(item.price).toBe(28.73);
  item.changeName("test");
  expect(item.name).toBe("test");
});

it("can create a whishList", () => {
  const list = WishList.create({
    items: [
      {
        name: "Chronicles of seb",
        price: 28.73,
        image: " https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL",
      },
      {
        name: "Chronicles of seb",
        price: 28.73,
        image: " https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL",
      },
    ],
  });
  expect(list.items.length).toBe(2);
  expect(list.items[0].price).toBe(28.73);
});

it("can add new items", () => {
  const list = WishList.create();
  const states = [];
  onSnapshot(list, (snapshot) => {
    states.push(snapshot);
  });

  list.add({
    name: "Chronicles of seb",
    price: 28.73,
    image: " https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL",
  });
  list.add({
    name: "Chronicles of seb",
    price: 28.73,
    image: " https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL",
  });

  expect(list.items.length).toBe(2);
  list.add(
    WhishListItem.create({
      name: "test",
      price: 28.73,
      image: " https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL",
    })
  );
  expect(list.items.length).toBe(3);
  expect(list.items[2].name).toBe("test");

  expect(getSnapshot(list)).toEqual({
    items: [
      {
        name: "Chronicles of seb",
        price: 28.73,
        image: " https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL",
      },
      {
        name: "Chronicles of seb",
        price: 28.73,
        image: " https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL",
      },
      {
        name: "test",
        price: 28.73,
        image: " https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL",
      },
    ],
  });

  expect(getSnapshot(list)).toMatchSnapshot();

  expect(states).toMatchSnapshot();
});

it("can add new items - 2", () => {
  const list = WishList.create();
  const patches = [];
  onPatch(list, (patch) => {
    patches.push(patch);
  });

  list.add({
    name: "Chronicles of seb",
    price: 28.73,
    image: " https://images-na.ssl-images-amazon.com/images/I/51LmtX5KPAL",
  });

  list.items[0].changeName("test");

  expect(patches).toMatchSnapshot();
});
