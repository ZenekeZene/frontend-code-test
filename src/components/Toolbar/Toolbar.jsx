import React from "react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react";
import { undoManager } from "../../stores/MainStore";
import { getRandomCoordinates } from "../../utils/getRandomCoordinates";
import BoxModel from "../../stores/models/BoxModel";
import { availableBackgroundColors, defaultFontColor } from '../../constants/colors';
import { canvasSize } from "../Canvas";
import { Counter } from "../Counter/Counter";
import { IconAdd } from "../../icons/iconAdd";
import { IconDelete } from "../../icons/IconDelete";
import { IconUndo } from "../../icons/IconUndo";
import { IconRedo } from "../../icons/IconRedo";
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
  const lastBackgroundColor = store.getLastBackgroundColorOfSelectedBoxes();

  const handleAddBox = () => {
    const newBox = createNewBox();
    store.addBox(newBox);
  };

  const handleChangeBackgroundColor = (event) => {
    store.changeCurrentBackgroundColorOfSelectedBoxes(event.target.value);
  };

  const handleBlurBackgroundColor = (event) => {
    store.changeBackgroundColorOfSelectedBoxes(event.target.value);
  };

  const undo = () => undoManager.canUndo && undoManager.undo();
  const redo = () => undoManager.canRedo && undoManager.redo();

  return (
    <nav className="nav">
      <Counter store={store} />
      <ul className="toolbar">
        <li className={`toolbar__tool ${isAnyBoxSelected ? '--is-disabled': ''}`}
          role="button"
          aria-label="Add folder"
          onClick={handleAddBox}
          disabled={isAnyBoxSelected}
        >
          <IconAdd />
        </li>
        <li className={`toolbar__tool ${!isAnyBoxSelected ? '--is-disabled': ''}`}
          role="button"
          aria-label="Remove folders"
          disabled={!isAnyBoxSelected}
          onClick={store.removeSelectedBoxes}
        >
          <IconDelete />
        </li>
        <li className={`toolbar__tool ${!isAnyBoxSelected ? '--is-disabled': ''}`}>
          <span className="toolbar__bgcolor-watch"
            style={{ backgroundColor: lastBackgroundColor }}
          ></span>
          <input
            onBlur={handleBlurBackgroundColor}
            onChange={handleChangeBackgroundColor}
            disabled={!isAnyBoxSelected}
            type="color"
            value={lastBackgroundColor}
          />
        </li>
        <li className={`toolbar__tool ${!undoManager.canUndo ? '--is-disabled': ''}`}
          role="button"
          aria-label="Undo"
          disabled={!undoManager.canUndo}
          onClick={undo}
          >
          <IconUndo />
        </li>
        <li className={`toolbar__tool ${!undoManager.canRedo ? '--is-disabled': ''}`}
          role="button"
          aria-label="Redo"
          disabled={!undoManager.canRedo}
          onClick={redo}
        >
          <IconRedo />
        </li>
      </ul>
    </nav>
  );
});

export { Toolbar };
