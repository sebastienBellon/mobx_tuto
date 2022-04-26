import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "./ReactotronConfig";

import { store } from "./models/model";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App store={store} />);
