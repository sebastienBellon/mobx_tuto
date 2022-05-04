import { types, flow, applySnapshot } from "mobx-state-tree";

import { WishList } from "./WishList";

const User = types
  .model({
    id: types.identifier,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f"]),
    wishList: types.optional(WishList, {}),
    recipient: types.maybe(types.reference(types.late(() => User))),
  })
  .actions((self) => ({
    getSuggestions: flow(function* getSuggestions() {
      const response = yield window.fetch(
        `http://localhost:3001/suggestions_${self.gender}`
      );
      const suggestions = yield response.json();
      self.wishList.items.push(...suggestions);
    }),
  }));

export const Group = types
  .model({
    users: types.map(User),
  })
  .actions((self) => {
    let controller; // declared in the global scope
    return {
      afterCreate() {
        // automatically fetch data automatically after the creation of the mobx store
        self.load();
      },
      load: flow(function* load() {
        // fetch data from the server
        controller = AbortController && new AbortController();
        try {
          // abort the previous request if it was still pending
          const response = yield window.fetch(`http://localhost:3001/users`, {
            signal: controller && controller.signal,
          });
          applySnapshot(self.users, yield response.json());
          console.log("success");
        } catch (e) {
          console.log("aborted", e.name);
        }
      }),
      reload() {
        if (controller) {
          // abord current request
          controller.abort();
        }
        self.load();
      },
      beforeDestroy() {
        if (controller) {
          controller.abort();
        }
      },
      drawLots() {
        const allUsers = Array.from(self.users.values());

        // not enough users, bail out
        if (allUsers.length <= 1) return;

        // not assigned lots
        let remaining = allUsers.slice();

        allUsers.forEach((user) => {
          // edge case: the only person without recipient
          // is the same as the only remaining lot
          // swap lot's with some random other person
          if (remaining.length === 1 && remaining[0] === user) {
            const swapWith =
              allUsers[Math.floor(Math.random() * (allUsers.length - 1))];
            user.recipients = swapWith.recipient;
            swapWith.recipient = self;
          } else
            while (!user.recipient) {
              // Pick random lot from remaing list
              let recipientIdx = Math.floor(Math.random() * remaining.length);

              // If it is not the current user, assign it as recipient
              // and remove the lot
              if (remaining[recipientIdx] !== user) {
                user.recipient = remaining[recipientIdx];
                remaining.splice(recipientIdx, 1);
              }
            }
        });
      },
    };
  });
