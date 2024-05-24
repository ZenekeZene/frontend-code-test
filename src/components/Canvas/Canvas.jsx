import React from "react";
import { observer } from "mobx-react";
import { isAlive } from "mobx-state-tree";
import { canvasSize } from "../../constants/canvas";
import { useMultipleDraggable } from "../../hooks/useMultipleDraggable/useMultipleDraggable";
import { useClickOutside } from "../../hooks/useClickOutside/useClickOutside";
import { DragService } from "../../services/drag.service";
import { SelectionCanvas } from "../SelectionCanvas/SelectionCanvas";
import BoxEditable from "../Box/BoxEditable/BoxEditable";
import "./Canvas.css";

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
  useMultipleDraggable({
    boxes: boxesToDrag,
    allBoxes: store.boxes,
    dragService: DragService,
    onDragEnd,
  });

  const ref = (box) => (node) => {
    if (!isAlive(box)) return;
    box.setNode(node);
  };

  const handleManualSelection = (box) => {
    if (areMultipleBoxesSelected) return;
    if (!isAlive(box)) return;
    store.selectBox(box);
  };

  const handleMouseOver = (box) => {
    if (!isAlive(box)) return;
    !areMultipleBoxesSelected && setSingleBoxToDrag(box);
    !box.isSelected && box.setHovered(true);
  };

  const handleMouseLeave = (box) => {
    // !areMultipleBoxesSelected && setSingleBoxToDrag(null);
    box.setHovered(false);
  };

  const handleMouseMove = (hoveredBoxes) => {
    store.boxes.forEach((box) => {
      const isHovered = hoveredBoxes.includes(box);
      if (box.isHovered === isHovered) return;
      box.setHovered(isHovered);
    });
  };

  return (
    <div
      className="canva"
      style={{ width: canvasSize.width, height: canvasSize.height }}
    >
      <SelectionCanvas
        boxes={store.boxes}
        onMouseUp={store.selectBoxes}
        onMouseMove={handleMouseMove}
      >
        {store.boxes.map((box, index) => (
          <BoxEditable
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
