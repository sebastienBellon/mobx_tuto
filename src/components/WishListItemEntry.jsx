import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import WishListItemEdit from "./WishListItemEdit";
import { WishListItem } from "../models/WishList";

const WisListItemEntry = ({ wishList }) => {
  const [entry, setEntry] = useState(
    WishListItem.create({
      name: "",
      price: 0,
    })
  );

  const onAdd = () => {
    wishList.add(entry);
    setEntry(
      WishListItem.create({
        name: "",
        price: 0,
      })
    );
  };

  return (
    <div>
      <WishListItemEdit item={entry} />
      <button onClick={onAdd}>Add</button>
    </div>
  );
};

export default WisListItemEntry;
