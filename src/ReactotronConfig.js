import Reactotron from "reactotron-react-js";

import { mst } from "reactotron-mst";

Reactotron.use(mst())
  .configure() // we can use plugins here -- more on this later
  .connect(); // let's connect!
