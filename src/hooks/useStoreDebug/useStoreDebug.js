import { onSnapshot } from "mobx-state-tree";

const useStoreDebug = (store) => {
  if (process.env.NODE_ENV !== "development") return;

  onSnapshot(store, (snapshot) => {
    console.log(snapshot);
  });
};

export { useStoreDebug };
