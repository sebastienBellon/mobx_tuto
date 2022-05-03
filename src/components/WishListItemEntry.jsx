import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import WishListItemEdit from "./WishListItemEdit";
import { WhishListItem } from "../models/WhishList";

const WhisListItemEntry = ({ whishList }) => {
  const [entry, setEntry] = useState(
    WhishListItem.create({
      name: "",
      price: 0,
    })
  );

  const onAdd = () => {
    whishList.add(entry);
    setEntry(
      WhishListItem.create({
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

export default WhisListItemEntry;
