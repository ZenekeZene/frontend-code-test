import React from 'react';
import { BoxSelectionTool } from "../BoxSelectionTool/BoxSelectionTool";
import { useSelectionToolCoordinates } from "../../hooks/useSelectionToolCoordinates/useSelectionToolCoordinates";
import "./SelectionCanvas.css";

const isBoxOverlappingWithOtherBox = ({ start, end }, box) => {
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  return (
    box.x >= minX &&
    box.x <= maxX &&
    box.y >= minY &&
    box.y <= maxY
  );
};

const getSelectedBoxesId = (boxesRef, coordinates) => {
  const boxes = Array.from(boxesRef.current.values());
  const selectedBoxesRef = boxes.filter((box) => {
    const { left, top } = box.getBoundingClientRect();
    const boxCoordinates = { x: left, y: top };
    return isBoxOverlappingWithOtherBox(coordinates, boxCoordinates);
  });
  return selectedBoxesRef.map((box) => box.id);
};

const SelectionCanvas = ({ boxesRef, onMouseUp, children }) => {
	const boxSelectionToolRef = React.useRef(null);

	const handleMouseUp = (coordinates) => {
    const selectedBoxesIds = getSelectedBoxesId(boxesRef, coordinates);
		onMouseUp(selectedBoxesIds);
  };

  const {
		isSelecting,
		coordinates,
		...events
	} = useSelectionToolCoordinates({ handleMouseUp });

	return (
		<div
			role="group"
			className="selection-canvas"
			{...events}
		>
			{ isSelecting && (
				<BoxSelectionTool
					boxSelectionToolRef={boxSelectionToolRef}
					startCoordinates={coordinates.start}
					endCoordinates={coordinates.end}
				/>
			)}
		{ children }</div>
	);
};

export { SelectionCanvas };
