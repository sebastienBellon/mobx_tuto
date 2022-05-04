import React from "react";
import { observer } from "mobx-react-lite";

import WishListItemView from "./WishListItemView";
import WhisListItemEntry from "./WishListItemEntry";

const WishListView = ({ wishList, readonly }) => {
  return (
    <div className="list">
      <ul>
        {wishList.items.map((item, idx) => (
          <WishListItemView key={idx} item={item} readonly={readonly} />
        ))}
      </ul>
      Total: {wishList.totalPrice}
      {!readonly && <WhisListItemEntry wishList={wishList} />}
    </div>
  );
};

export default observer(WishListView);
