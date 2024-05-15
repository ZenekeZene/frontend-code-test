import React from "react";
import uuid from "uuid/v4";
import { observer } from "mobx-react";
import getRandomColor from "../utils/getRandomColor";
import { getRandomCoordinates } from "../utils/getRandomCoordinates";
import BoxModel from "../stores/models/Box";
import { canvasSize } from "./Canvas";

const createNewBox = () => {
  const coordinates = getRandomCoordinates(canvasSize);
  return BoxModel.create({
    id: uuid(),
    color: getRandomColor(),
    ...coordinates,
  });
};

function Toolbar({ store }) {
  const handleAddBox = () => {
    const newBox = createNewBox();
    store.addBox(newBox);
  };

  const handleRemoveBox = () => {
    if (!store.isAnyBoxSelected()) return;
    store.removeBox();
  };

  return (
    <div className="toolbar">
      <button onClick={handleAddBox}>Add Box</button>
      <button
        disabled={!store.isAnyBoxSelected()}
        onClick={handleRemoveBox}
      >Remove Box</button>
      <input type="color" />
      <span>No boxes selected</span>
    </div>
  );
}

export default observer(Toolbar);
