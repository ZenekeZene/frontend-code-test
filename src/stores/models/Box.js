import { types } from "mobx-state-tree";

const Box = {
  width: 200,
  height: 100,
};

const actions = (self) => ({
  move(left, top) {
    self.left = left;
    self.top = top;
  },
  select() {
    self.isSelected = true;
  },
  unselect() {
    self.isSelected = false;
  },
  changeColor(color) {
    self.color = color;
  },
  setNode(node) {
    self.node = node;
  },
});

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
  .volatile(self => ({
    node: null,
  }))
  .views(self => ({}))
  .actions(actions);

export default BoxModel;
