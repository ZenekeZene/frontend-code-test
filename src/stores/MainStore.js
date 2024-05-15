import { types } from "mobx-state-tree";
import uuid from "uuid/v4";
import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel)
  })
  .actions(self => {
    return {
      addBox(box) {
        self.boxes.push(box);
      },
      removeBox() {
        const index = self.boxes.findIndex(box => box.isSelected);
        self.boxes.splice(index, 1);
      },
      selectBox(box) {
        self.boxes.forEach(b => {
          if (b.id === box.id) {
            b.isSelected = !b.isSelected;
          } else {
            b.isSelected = false;
          }
        });
      }
    };
  })
  .views(self => ({
    isAnyBoxSelected() {
      return self.boxes.some(box => box.isSelected);
    }
  }));

const store = MainStore.create();

const box1 = BoxModel.create({
  id: uuid(),
  color: getRandomColor(),
  left: 0,
  top: 0
});

store.addBox(box1);

export default store;
