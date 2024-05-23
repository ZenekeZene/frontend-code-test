import { types } from "mobx-state-tree";
import tinycolor from "tinycolor2";
import { availableBackgroundColors } from "../../constants/colors";
import { boxSize } from '../../constants/box';

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
  changeCurrentColor(color) {
    self.currentColor = color;
  },
  changeCurrentBackgroundColor(backgroundColor) {
    self.currentBackgroundColor = backgroundColor;
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
  },
  setIsEditingColor(value) {
    self.isEditingColor = value;
    self.currentColor = self.color;
  },
  setIsEditingBackgroundColor(value) {
    self.isEditingBackgroundColor = value;
    self.currentBackgroundColor = self.backgroundColor;
  },
  setIsEditingText(value) {
    self.isEditingText = value;
  }
});

const BoxModel = types
  .model("Box", {
    id: types.identifier,
    width: boxSize.width,
    height: boxSize.height,
    left: types.number,
    top: types.number,
    text: types.maybeNull(types.string),
    color: types.string,
    backgroundColor: availableBackgroundColors[0],
  })
  .volatile(self => ({
    node: null,
    isHovered: false,
    isSelected: false,
    isEditingColor: false,
    isEditingBackgroundColor: false,
    isEditingText: false,
    currentColor: self.color,
    currentBackgroundColor: self.backgroundColor
  }))
  .views(self => ({
    get lighterBackgroundColor() {
      const color = tinycolor(self.currentBackgroundColor);
      const lighterColor = color.lighten(30);
      return lighterColor.toString();
    },
    get darkerBackgroundColor() {
      const color = tinycolor(self.isEditingBackgroundColor ? self.currentBackgroundColor : self.backgroundColor);
      const darkerColor = color.darken(20);
      return darkerColor.toString();
    }
  }))
  .actions(actions);

export { BoxModel };
