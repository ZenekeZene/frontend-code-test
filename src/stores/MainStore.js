import { types } from "mobx-state-tree";
import { BoxModel } from "./models/BoxModel";
import { views } from "./views";
import { actions } from "./actions";

export const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel),
  })
  .volatile(() => ({
    isMultipleBoxesSelectedEnabled: false,
    isSelecting: false,
  }))
  .actions(actions)
  .views(views);

const store = MainStore.create();

export default store;
