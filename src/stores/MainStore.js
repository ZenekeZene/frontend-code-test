import { types } from "mobx-state-tree";
import BoxModel from "./models/BoxModel";

const views = (self) => ({
  get selectedBox() {
    return self.boxes.find(box => box.isSelected);
  },
  getSelectedBoxes() {
    return self.boxes.filter(box => box.isSelected);
  },
  getNumberOfSelectedBoxes() {
    return self.getSelectedBoxes().length;
  },
  isAnyBoxSelected() {
    return self.getNumberOfSelectedBoxes() > 0;
  },
  areMultipleBoxesSelected() {
    return self.getNumberOfSelectedBoxes() > 1;
  },
});

const actions = (self) => ({
  addBox: (box) => {
    self.boxes.push(box);
  },
  removeBox: () => {
    const index = self.boxes.findIndex(box => box.isSelected);
    self.boxes.splice(index, 1);
  },
  removeSelectedBoxes: () => {
    const selectedBoxes = self.getSelectedBoxes();
    selectedBoxes.forEach(box => {
      const index = self.boxes.findIndex(b => b.id === box.id);
      self.boxes.splice(index, 1);
    });
  },
  selectBox: (box) => {
    self.boxes.forEach(b => {
      if (b.id === box.id) {
        b.select();
      } else {
        b.unselect();
      }
    });
  },
  selectBoxes: (boxes) => {
    self.boxes.forEach(box => {
      if (boxes.includes(box)) {
        box.select();
      } else {
        box.unselect();
      }
    });
  },
  unselectAllBoxes: () => {
    self.boxes.forEach(box => box.unselect());
  },
  changeSelectedBoxesColor: (color) => {
    self.getSelectedBoxes().forEach(box => box.changeBackgroundColor(color));
  },
});

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel),
  })
  .actions(actions)
  .views(views);

const store = MainStore.create();

export default store;
