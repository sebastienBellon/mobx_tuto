import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { values } from "mobx";

import logo from "./assets/santa-claus.png";

import WishListView from "./components/WishListView";

const App = observer(({ group }) => {
  const [user, setUser] = useState(null);

  const onSelectUser = (event) => {
    setUser(group.users.get(event.target.value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">WishList</h1>
      </header>
      <select onChange={onSelectUser}>
        <option>- Select user -</option>
        {/* Array.from converts an iterable to array, so that we can map over it */}
        {Array.from(group.users.values()).map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      {user && <WishListView whishList={user.wishList} />}
      {user && <button onClick={user.getSuggestions}>Suggestions</button>}
    </div>
  );
});

export default App;
