import React from "react";
import { observer } from "mobx-react";
import { isAlive } from "mobx-state-tree";
import { canvasSize } from "../../constants/canvas";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";
import { useMultipleDraggable } from "../../hooks/useMultipleDraggable/useMultipleDraggable";
import { DragService } from "../../services/drag.service";
import { SelectionCanvas } from "../SelectionCanvas/SelectionCanvas";
import BoxEditable from "../Box/BoxEditable/BoxEditable";

const Canvas = ({ store }) => {
  const selectionCanvasRef = React.useRef();
  const [singleBoxToDrag, setSingleBoxToDrag] = React.useState(null);
  const selectedBoxes = store.getSelectedBoxes();
  const areMultipleBoxesSelected = store.areMultipleBoxesSelected();
  const isSingleBoxToDrag = singleBoxToDrag && !areMultipleBoxesSelected;
  const boxesToDrag = isSingleBoxToDrag ? [singleBoxToDrag] : selectedBoxes;

  useKeyboardShortcuts({ store });

  const onDragEnd = (box, { x, y }) => {
    box.move(x, y);
  };

  useMultipleDraggable({
    boxesToDrag: boxesToDrag,
    allBoxes: store.boxes,
    dragService: DragService,
    onDragEnd,
  });

  const ref = (box) => (node) => {
    if (!isAlive(box)) return;
    box.setNode(node);
  };

  const handleManualSelection = (box) => {
    if (!isAlive(box)) return;
    if (store.isMultipleBoxesSelectedEnabled) {
      store.selectBox(box);
    } else if (!areMultipleBoxesSelected) {
      store.selectSingleBox(box);
    }
  };

  const handleMouseOver = (box) => {
    if (!isAlive(box)) return;
    if (areMultipleBoxesSelected) return;
    setSingleBoxToDrag(box);
    box.setHovered(true);
  };

  const handleMouseLeave = (box) => {
    !areMultipleBoxesSelected && setSingleBoxToDrag(null);
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
      onClickCapture={(event) => {
        if (store.isSelecting) return;
        const targets = [event.currentTarget, selectionCanvasRef.current];
        if (!targets.includes(event.target)) return;
        store.unselectAllBoxes();
      }}
    >
      <SelectionCanvas
        ref={selectionCanvasRef}
        store={store}
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
