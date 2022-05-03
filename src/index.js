import React from "react";
import ReactDOM from "react-dom/client";
import "./ReactotronConfig";

import App from "./App";

import { WishList } from "./models/WhishList";

const whishList = WishList.create({
  items: [
    {
      name: "Chronicles of seb",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
  ],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App whishList={whishList} />);

setInterval(() => {
  whishList.items[0].changePrice(whishList.items[0].price + 1);
}, 1000);
