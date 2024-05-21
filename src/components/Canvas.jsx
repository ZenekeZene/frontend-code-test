import React from "react";
import { observer } from "mobx-react";
import { isAlive } from "mobx-state-tree";
import { useMultipleDraggable } from "../hooks/useMultipleDraggable/useMultipleDraggable";
import { useClickOutside } from "../hooks/useClickOutside/useClickOutside";
import { DragService } from '../services/drag.service';
import { SelectionCanvas } from "./SelectionCanvas/SelectionCanvas";
import Box from "./Box/Box";
import './Canvas.css';

export const canvasSize = {
  width: '100%',
  height: '100%'
};

const Canvas = ({ store }) => {
  const [singleBoxToDrag, setSingleBoxToDrag] = React.useState(null);
  const selectedBoxes = store.getSelectedBoxes();
  const areMultipleBoxesSelected = store.areMultipleBoxesSelected();

  useClickOutside({ onBlur: () => store.unselectAllBoxes() });

  const onDragEnd = (box, { x, y }) => {
    box.move(x, y);
  };

  const isSingleBoxToDrag = singleBoxToDrag && !areMultipleBoxesSelected;
  const boxesToDrag = isSingleBoxToDrag ? [singleBoxToDrag] : selectedBoxes;
  useMultipleDraggable({ boxes: boxesToDrag, dragService: DragService, onDragEnd })

  const ref = box => node => {
    if (!isAlive(box)) return;
    box.setNode(node);
  };

  const handleManualSelection = (box) => {
    if (areMultipleBoxesSelected) return;
    store.selectBox(box);
  };

  const handleMouseOver = (box) => {
    !areMultipleBoxesSelected && setSingleBoxToDrag(box);
    box.setHovered(true);
  };

  const handleMouseLeave = (box) => {
    !areMultipleBoxesSelected && setSingleBoxToDrag(null);
    box.setHovered(false);
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
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleManualSelection}
            onRemove={() => store.removeBox(box)}
            areMultipleBoxesSelected={areMultipleBoxesSelected}
          />
        ))}
      </SelectionCanvas>
    </div>
  );
};

export default observer(Canvas);
