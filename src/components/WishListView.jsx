import React from "react";
import { observer } from "mobx-react-lite";

import WishListItemView from "./WishListItemView";

const WishListView = ({ whishList }) => {
  return (
    <div className="list">
      <ul>
        {whishList.items.map((item, idx) => (
          <WishListItemView key={idx} item={item} />
        ))}
      </ul>
      Total: {whishList.totalPrice}
    </div>
  );
};

export default observer(WishListView);
