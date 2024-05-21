import React from "react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react";
import { getRandomCoordinates } from "../../utils/getRandomCoordinates";
import BoxModel from "../../stores/models/BoxModel";
import { availableBackgroundColors, defaultFontColor } from '../../constants/colors';
import { canvasSize } from "../Canvas";
import { Counter } from "../Counter/Counter";
import { IconAdd } from "../../icons/iconAdd";
import { IconDelete } from "../../icons/IconDelete";
import "./Toolbar.css";

const createNewBox = () => {
  const coordinates = getRandomCoordinates(canvasSize);
  return BoxModel.create({
    id: uuid(),
    color: defaultFontColor,
    backgroundColor: availableBackgroundColors[Math.floor(Math.random() * availableBackgroundColors.length)],
    ...coordinates,
  });
};

const Toolbar = observer(({ store }) => {
  const isAnyBoxSelected = store.isAnyBoxSelected();
  const selectedBoxes = store.getSelectedBoxes();

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
    <nav className="nav">
      <Counter store={store} />
      <ul className="toolbar">
        <li className={`toolbar__tool ${isAnyBoxSelected ? '--is-disabled': ''}`}>
          <IconAdd
            role="button"
            aria-label="Add folder"
            onClick={handleAddBox}
            disabled={isAnyBoxSelected}
          />
        </li>
        <li className={`toolbar__tool ${!isAnyBoxSelected ? '--is-disabled': ''}`}>
          <IconDelete
            role="button"
            aria-label="Remove folders"
            disabled={!isAnyBoxSelected}
            onClick={handleRemoveBoxes}
          />
        </li>
        <li className={`toolbar__tool ${!isAnyBoxSelected ? '--is-disabled': ''}`}>
          <span className="toolbar__bgcolor-watch" style={{ backgroundColor: isAnyBoxSelected ? selectedBoxes[selectedBoxes.length - 1].backgroundColor : 'black' }}></span>
          <input
            disabled={!isAnyBoxSelected}
            type="color"
            onChange={handleChangeBackgroundColor}
          />
        </li>
      </ul>
    </nav>
  );
});

export { Toolbar };
