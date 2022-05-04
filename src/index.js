import React from "react";
import ReactDOM from "react-dom/client";
import "./ReactotronConfig";

import { addMiddleware, getSnapshot, onSnapshot } from "mobx-state-tree";

import "./assets/index.css";

import App from "./App";

import { Group } from "./models/Groups";

let initialState = { users: {} };

// if (localStorage.getItem("groupapp")) {
//   let getObject = localStorage.getItem("groupapp");
//   const json = JSON.parse(getObject);
//   if (Group.is(json)) {
//     // this is to ensure that our localstrorage still meet the structure of the tree
//     initialState = json;
//   }
// }

let group = (window.group = Group.create(initialState));
addMiddleware(group, (call, next) => {
  console.log(`[${call.type}] ${call.name}`);
  return next(call);
});

onSnapshot(group, (snapshot) => {
  localStorage.setItem("groupapp", JSON.stringify(snapshot));
});

const root = ReactDOM.createRoot(document.getElementById("root"));
function renderApp() {
  root.render(<App group={group} />);
}

renderApp();

if (module.hot) {
  module.hot.accept(["./App"], () => {
    //new components => hot reloading
    renderApp();
  });

  module.hot.accept(["./models/Groups.js"], () => {
    // new model definitions => we want to preserve the current state
    const snapshot = getSnapshot(group);
    group = window.group = Group.create(snapshot);
    renderApp();
  });
}
