import React from "react";
import ReactDOM from "react-dom/client";
import "./ReactotronConfig";

import { getSnapshot, onSnapshot } from "mobx-state-tree";

import "./assets/index.css";

import App from "./App";

import { WishList } from "./models/WhishList";

let initialState = {
  items: [
    {
      name: "LEGO Mindstorms EV3",
      price: 349.95,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg",
    },
    {
      name: "Miracles - C.S. Lewis",
      price: 12.91,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51a7xaMpneL._SX329_BO1,204,203,200_.jpg",
    },
  ],
};

if (localStorage.getItem("wishlistapp")) {
  let getObject = localStorage.getItem("wishlistapp");
  const json = JSON.parse(getObject);
  if (WishList.is(json)) {
    // this is to ensure that our localstrorage still meet the structure of the tree
    initialState = json;
  }
}

let whishList = WishList.create(initialState);

onSnapshot(whishList, (snapshot) => {
  localStorage.setItem("wishlistapp", JSON.stringify(snapshot));
});

const root = ReactDOM.createRoot(document.getElementById("root"));
function renderApp() {
  root.render(<App whishList={whishList} />);
}

renderApp();

if (module.hot) {
  module.hot.accept(["./App"], () => {
    //new components => hot reloading
    renderApp();
  });

  module.hot.accept(["./models/WhishList.js"], () => {
    // new model definitions => we want to preserve the current state
    const snapshot = getSnapshot(whishList);
    whishList = WishList.create(snapshot);
    renderApp();
  });
}
