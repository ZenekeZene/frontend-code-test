import { types } from "mobx-state-tree";
import BoxModel from "./models/Box";

const views = (self) => ({
  get selectedBox() {
    return self.boxes.find(box => box.isSelected);
  },
  getNumberOfSelectedBoxes() {
    return self.boxes.filter(box => box.isSelected).length;
  },
  isAnyBoxSelected() {
    return self.getNumberOfSelectedBoxes() > 0;
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
  selectBox: (box) => {
    self.boxes.forEach(b => {
      if (b.id === box.id) {
        b.select();
      } else {
        b.unselect();
      }
    });
  },
  unselectAllBoxes: () => {
    self.boxes.forEach(box => box.unselect());
  },
});

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel)
  })
  .actions(actions)
  .views(views);

const store = MainStore.create();

export default store;
