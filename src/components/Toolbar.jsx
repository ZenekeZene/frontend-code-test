import React from "react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react";
import { getRandomCoordinates } from "../utils/getRandomCoordinates";
import BoxModel from "../stores/models/BoxModel";
import { canvasSize } from "./Canvas";
import { availableBackgroundColors, defaultFontColor } from '../constants/colors';

const createNewBox = () => {
  const coordinates = getRandomCoordinates(canvasSize);
  return BoxModel.create({
    id: uuid(),
    color: defaultFontColor,
    backgroundColor: availableBackgroundColors[Math.floor(Math.random() * availableBackgroundColors.length)],
    ...coordinates,
  });
};

const Toolbar = ({ store }) => {
  const isAnyBoxSelected = store.isAnyBoxSelected();

  const handleAddBox = () => {
    const newBox = createNewBox();
    store.addBox(newBox);
  };

  const handleRemoveBoxes = () => {
    if (!isAnyBoxSelected) return;
    store.removeSelectedBoxes();
  };

  const handleChangeBackgroundColor = (event) => {
    if (!isAnyBoxSelected) return;
    store.changeSelectedBoxesColor(event.target.value);
  };

  return (
    <div className="toolbar">
      <button
        onClick={handleAddBox}
      >Add Box</button>
      { store.areMultipleBoxesSelected() && (
        <button
          disabled={!isAnyBoxSelected}
          onClick={handleRemoveBoxes}
        >Remove Boxes</button>
      )}
      <input
        disabled={!isAnyBoxSelected}
        type="color"
        onChange={handleChangeBackgroundColor}
      />
      <span>{ isAnyBoxSelected ? store.getNumberOfSelectedBoxes() : 'No boxes selected' }</span>
    </div>
  );
}

export default observer(Toolbar);
