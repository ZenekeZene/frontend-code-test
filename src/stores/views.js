import { availableBackgroundColors } from "../constants/colors";

export const views = (self) => ({
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
