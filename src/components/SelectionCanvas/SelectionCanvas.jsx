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

const calculateSelectedBoxes = (boxes, coordinates) => {
  const selectedBoxes = boxes.filter((box) => {
    const { left, top } = box.node.getBoundingClientRect();
    const boxCoordinates = { x: left, y: top };
    return isBoxOverlappingWithOtherBox(coordinates, boxCoordinates);
  });
  return selectedBoxes;
};

const SelectionCanvas = ({ boxes, onMouseUp, onMouseMove, children }) => {
	const boxSelectionToolRef = React.useRef(null);

	const handleMouseUp = (coordinates) => {
    const selectedBoxes = calculateSelectedBoxes(boxes, coordinates);
		onMouseUp(selectedBoxes);
  };

	const handleMouseMove = (coordinates) => {
		const hoveredBoxes = calculateSelectedBoxes(boxes, coordinates);
		onMouseMove(hoveredBoxes);
	};

  const {
		isSelecting,
		coordinates,
		...events
	} = useSelectionToolCoordinates({ handleMouseMove, handleMouseUp });

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
