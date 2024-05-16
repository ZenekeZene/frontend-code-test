import React from "react";
import { observer } from "mobx-react";
import { useClickOutside } from "../hooks/useClickOutside";
import { SelectionCanvas } from "./SelectionCanvas/SelectionCanvas";
import Box from "./Box/Box";

export const canvasSize = {
  width: 800,
  height: 600
};

const Canvas = ({ store }) => {
  const boxesRef = React.useRef(new Map());
  useClickOutside({ onBlur: () => store.unselectAllBoxes() });
  const ref = box => node => boxesRef.current.set(box.id, node);

  const handleOnClick = (event, box) => {
    event.stopPropagation();
    store.selectBox(box);
  };

  const onDragEnd = (box, { x, y }) => {
    box.move(x, y);
  };

  const selectBoxesByIDs = (selectedBoxesIds) => {
    const selectedBoxes = store.filterBoxesByIDs(selectedBoxesIds);
    store.selectBoxes(selectedBoxes);
  };

  return (
    <div
      className="canva"
      style={{ width: canvasSize.width, height: canvasSize.height }}
    >
      <SelectionCanvas
        boxesRef={boxesRef}
        onMouseUp={selectBoxesByIDs}
      >
        {store.boxes.map((box, index) => (
          <Box
            ref={ref(box)}
            key={index}
            box={box}
            onClick={(event) => handleOnClick(event, box)}
            onDragEnd={(coordinates) => onDragEnd(box, coordinates)}
          />
        ))}
      </SelectionCanvas>
    </div>
  );
};

export default observer(Canvas);
