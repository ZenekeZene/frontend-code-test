import { types } from "mobx-state-tree";
import tinycolor from "tinycolor2";

const Box = {
  width: 136,
  height: 66,
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
  changeBackgroundColor(backgroundColor) {
    self.backgroundColor = backgroundColor;
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
    backgroundColor: "#000FFF",
    left: 200,
    top: 100,
    isSelected: false,
  })
  .volatile(self => ({
    node: null,
  }))
  .views(self => ({
    get lighterBackgroundColor() {
      const color = tinycolor(self.backgroundColor);
      const lighterColor = color.lighten(30);
      return lighterColor.toString();
    },
    get darkerBackgroundColor() {
      const color = tinycolor(self.backgroundColor);
      const darkerColor = color.darken(20);
      return darkerColor.toString();
    }
  }))
  .actions(actions);

export default BoxModel;
