import Reactotron from "reactotron-react-js";
import { mst } from "reactotron-mst";

import { Group } from "./Groups";

// tell Reactotron to use this plugin
Reactotron.use(mst());

export let store = Group.create({
  users: {}, // users is not required really since arrays and maps are optional by default since MST3
});

// let reactotron-mst know about it
Reactotron.trackMstNode(store);
