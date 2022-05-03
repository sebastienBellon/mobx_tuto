import { observer } from "mobx-react-lite";
import { values } from "mobx";

import WishListView from "./components/WishListView";

const App = observer((props) => (
  <div>
    <header>
      <h1>WhishList</h1>
    </header>
    <WishListView whishList={props.whishList} />
  </div>
));

export default App;
