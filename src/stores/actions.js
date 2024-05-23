import { createInitialBoxes } from "../stores/initialStore";
import { PersistService } from "../services/persist.service";
import { setUndoManager } from "../services/undo.service";

export const actions = (self) => {
  const undoManager = setUndoManager(self).get();

  return ({
    afterCreate: () => {
      undoManager.withoutUndo(() => {
        createInitialBoxes({ store: self });
      });
    },
    loadFromStorage: () => {
      PersistService({ store: self, whitelist: ['boxes'] })
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
    removeAllBoxes: () => {
      self.boxes.clear();
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
