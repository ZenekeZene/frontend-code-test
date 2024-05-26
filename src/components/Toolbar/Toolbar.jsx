import React from "react";
import { observer } from "mobx-react";
import { getUndoManager } from "../../services/undo.service";
import { createBox } from "../../stores/models/createBox";
import { Icon } from "../../icons";
import { Counter } from "../Counter/Counter";
import "./Toolbar.css";

const undoManager = getUndoManager();

const Toolbar = observer(({ store }) => {
  const isAnyBoxSelected = store.isAnyBoxSelected();
  const lastBackgroundColor = store.getLastBackgroundColorOfSelectedBoxes();

  const handleAddBox = () => {
    const newBox = createBox();
    store.addBox(newBox);
  };

  const handleChangeBackgroundColor = (event) => {
    store.changeCurrentBackgroundColorOfSelectedBoxes(event.target.value);
  };

  const handleBlurBackgroundColor = (event) => {
    store.changeBackgroundColorOfSelectedBoxes(event.target.value);
  };

  const clear = () => {
    store.removeAllBoxes();
  };

  const undo = () => undoManager.canUndo && undoManager.undo();
  const redo = () => undoManager.canRedo && undoManager.redo();

  return (
    <nav className="nav">
      <Counter store={store} />
      <ul className="toolbar">
        <li
          className={`toolbar__tool ${isAnyBoxSelected ? "--is-disabled" : ""}`}
          role="button"
          aria-label="Add folder"
          onClick={handleAddBox}
          disabled={isAnyBoxSelected}
        >
          <Icon.Add />
        </li>
        <li
          className={`toolbar__tool ${!isAnyBoxSelected ? "--is-disabled" : ""}`}
          role="button"
          aria-label="Remove folders"
          disabled={!isAnyBoxSelected}
          onClick={store.removeSelectedBoxes}
        >
          <Icon.Delete />
        </li>
        <li
          className={`toolbar__tool ${!isAnyBoxSelected ? "--is-disabled" : ""}`}
        >
          <span
            className="toolbar__bgcolor-watch"
            style={{ backgroundColor: lastBackgroundColor }}
          ></span>
          <input
            onBlur={handleBlurBackgroundColor}
            onChange={handleChangeBackgroundColor}
            disabled={!isAnyBoxSelected}
            type="color"
            value={lastBackgroundColor}
            aria-label="Change background color of selected boxes"
          />
        </li>
        <li
          className={`toolbar__tool ${!undoManager.canUndo ? "--is-disabled" : ""}`}
          role="button"
          aria-label="Undo"
          disabled={!undoManager.canUndo}
          onClick={undo}
        >
          <Icon.Undo />
        </li>
        <li
          className={`toolbar__tool ${!undoManager.canRedo ? "--is-disabled" : ""}`}
          role="button"
          aria-label="Redo"
          disabled={!undoManager.canRedo}
          onClick={redo}
        >
          <Icon.Redo />
        </li>
        <li
          className="toolbar__tool"
          role="button"
          aria-label="Clear"
          onClick={clear}
        >
          <Icon.Clear />
        </li>
      </ul>
    </nav>
  );
});

export { Toolbar };
