import React from "react";
import { observer } from "mobx-react";
import { isAlive } from "mobx-state-tree";
import { useMultipleDraggable } from "../hooks/useMultipleDraggable/useMultipleDraggable";
import { useClickOutside } from "../hooks/useClickOutside/useClickOutside";
import { DragService } from '../services/drag.service';
import { SelectionCanvas } from "./SelectionCanvas/SelectionCanvas";
import Box from "./Box/Box";

export const canvasSize = {
  width: 800,
  height: 600
};

const Canvas = ({ store }) => {
  const selectedBoxes = store.getSelectedBoxes();
  useClickOutside({ onBlur: () => store.unselectAllBoxes() });

  const onDragEnd = (box, { x, y }) => {
    box.move(x, y);
  };

  useMultipleDraggable({ boxes: selectedBoxes, dragService: DragService, onDragEnd })

  const ref = box => node => {
    if (!isAlive(box)) return;
    box.setNode(node);
  };

  const handleManualSelection = (box) => {
    if (store.areMultipleBoxesSelected()) return;
    store.selectBox(box);
  };

  return (
    <div
      className="canva"
      style={{ width: canvasSize.width, height: canvasSize.height }}
    >
      <SelectionCanvas
        boxes={store.boxes}
        onMouseUp={store.selectBoxes}
      >
        {store.boxes.map((box, index) => (
          <Box
            ref={ref(box)}
            key={index}
            box={box}
            onMouseDown={handleManualSelection}
          />
        ))}
      </SelectionCanvas>
    </div>
  );
};

export default observer(Canvas);
