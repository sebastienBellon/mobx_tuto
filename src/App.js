import { observer } from "mobx-react-lite";
import { values } from "mobx";

import logo from "./assets/santa-claus.png";

import WishListView from "./components/WishListView";

const App = observer((props) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">WhishList</h1>
    </header>
    <WishListView whishList={props.whishList} />
  </div>
));

export default App;
