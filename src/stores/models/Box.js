import { types } from "mobx-state-tree";

const Box = {
  width: 200,
  height: 100,
};

const BoxModel = types
  .model("Box", {
    id: types.identifier,
    width: Box.width,
    height: Box.height,
    color: "#FFF000",
    left: 200,
    top: 100,
    isSelected: false,
  })
  .views(self => ({}))
  .actions(self => ({}));

export default BoxModel;
