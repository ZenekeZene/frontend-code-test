import { types } from "mobx-state-tree";
import { UndoManager } from "mst-middlewares";
import BoxModel from "./models/BoxModel";
import { createInitialBoxes } from "../stores/initialStore";
import { availableBackgroundColors } from "../constants/colors";
import { PersistService } from "../services/persist.service";

const BOXES = Object.freeze({
  key: 'boxes',
});

const views = (self) => ({
  get selectedBox() {
    return self.boxes.find(box => box.isSelected);
  },
  getNumberOfCreatedBoxes() {
    return self.boxes.length;
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
  getLastBackgroundColorOfSelectedBoxes() {
    const selectedBoxes = self.getSelectedBoxes();
    const lastSelectedBox = selectedBoxes[selectedBoxes.length - 1];
    return self.isAnyBoxSelected() ? lastSelectedBox.currentBackgroundColor : availableBackgroundColors[0];
  }
});

const actions = (self) => {
  setUndoManager(self);

  return ({
    afterCreate: () => {
      undoManager.withoutUndo(() => {
        createInitialBoxes({ store: self });
      });
    },
    loadFromStorage: () => {
      PersistService({ store: self, whitelist: [BOXES.key] })
        .persist().then(() => {
          undoManager.clear();
        });
    },
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
    setIsEditingColorOfSelectedBoxes: (value) => {
      self.getSelectedBoxes().forEach(box => box.setIsEditingBackgroundColor(value));
    },
    changeBackgroundColorOfSelectedBoxes: (backgroundColor) => {
      self.getSelectedBoxes().forEach(box => {
        box.changeBackgroundColor(backgroundColor);
        box.setIsEditingBackgroundColor(false);
      });
    },
    changeCurrentBackgroundColorOfSelectedBoxes: (backgroundColor) => {
      self.getSelectedBoxes().forEach(box => {
        if (!box.isEditingBackgroundColor) box.setIsEditingBackgroundColor(true);
        box.changeCurrentBackgroundColor(backgroundColor)
      });
    },
  })
};

const MainStore = types
  .model("MainStore", {
    [BOXES.key]: types.array(BoxModel),
  })
  .actions(actions)
  .views(views);

export let undoManager = {};
export const setUndoManager = (targetStore) => {
  undoManager = UndoManager.create({}, { targetStore });
};

const store = MainStore.create();

export default store;
