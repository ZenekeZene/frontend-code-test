import { types } from "mobx-state-tree";
import tinycolor from "tinycolor2";
import { availableBackgroundColors } from "../../constants/colors";
import { size } from '../../constants/box';

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
  setText(text) {
    self.text = text;
  },
  setHovered(value) {
    self.isHovered = value;
  }
});

const BoxModel = types
  .model("Box", {
    id: types.identifier,
    width: size.width,
    height: size.height,
    color: types.string,
    backgroundColor: availableBackgroundColors[0],
    left: types.number,
    top: types.number,
    isSelected: false,
    isHovered: false,
    text: types.maybeNull(types.string),
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
