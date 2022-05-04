import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { values } from "mobx";

import logo from "./assets/santa-claus.png";

import WishListView from "./components/WishListView";

const User = observer(({ user }) => {
  return (
    <div>
      <WishListView wishList={user.wishList} />
      <button onClick={user.getSuggestions}>Suggestions</button>
      <hr />
      <h2>{user.recipient ? user.recipient.name : ""}</h2>
      {user.recipient && (
        <WishListView wishList={user.recipient.wishList} readonly />
      )}
    </div>
  );
});

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
      <button onClick={group.drawLots}>Draw lots</button>
      {user && <User user={user} />}
    </div>
  );
});

export default App;
