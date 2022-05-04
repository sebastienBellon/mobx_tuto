import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree";

import WishListItemEdit from "./WishListItemEdit";

const WishListItemView = ({ item, readonly }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [snap, setSnap] = useState(null);

  const onSubmit = () => {
    applySnapshot(item, getSnapshot(snap));
    setIsEditing(false);
    setSnap(null);
  };

  return (
    <>
      {isEditing ? (
        <li className="item">
          <WishListItemEdit item={snap} />
          <button onClick={onSubmit}>💾</button>
          <button
            onClick={() => {
              setIsEditing(setIsEditing(false));
            }}
          >
            ❎
          </button>
        </li>
      ) : (
        <li className="item">
          {item.image && <img src={item.image} alt={item.name} />}
          <h3>{item.name}</h3>
          <span>{item.price} $</span>
          {!readonly && (
            <span>
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setSnap(clone(item));
                }}
              >
                ✏
              </button>

              <button
                onClick={() => {
                  item.remove();
                }}
              >
                ❎
              </button>
            </span>
          )}
        </li>
      )}
    </>
  );
};

export default observer(WishListItemView);
