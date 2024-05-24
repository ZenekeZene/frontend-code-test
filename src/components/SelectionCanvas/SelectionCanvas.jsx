import React from "react";
import { isBoxOverlapping } from "../../utils/isBoxOverlapping";
import { BoxSelectionTool } from "../Box/BoxSelectionTool/BoxSelectionTool";
import { useSelectionToolCoordinates } from "../../hooks/useSelectionToolCoordinates/useSelectionToolCoordinates";
import "./SelectionCanvas.css";

const SelectionCanvas = ({ boxes, onMouseUp, onMouseMove, onClick, children }) => {
  const boxSelectionToolRef = React.useRef(null);

  const calculateSelectedBoxes = (boxes) =>
    boxes.filter((box) =>
      isBoxOverlapping(box.node, boxSelectionToolRef.current),
    );

  const handleMouseUp = (event) => {
    if (!boxSelectionToolRef.current) return;
    const selectedBoxes = calculateSelectedBoxes(boxes);
    onMouseUp(selectedBoxes, event);
  };

  const handleMouseMove = () => {
    if (!boxSelectionToolRef.current) return;
    const hoveredBoxes = calculateSelectedBoxes(boxes);
    onMouseMove(hoveredBoxes);
  };

  const { isSelecting, coordinates, ...events } = useSelectionToolCoordinates(
    {
      handleMouseMove,
      handleMouseUp,
    },
  );

  return (
    <div
      role="group"
      className="selection-canvas"
      onClick={onClick}
      {...events}
    >
      {isSelecting && (
        <BoxSelectionTool
          ref={boxSelectionToolRef}
          startCoordinates={coordinates.start}
          endCoordinates={coordinates.end}
        />
      )}
      {children}
    </div>
  );
};

export { SelectionCanvas };
