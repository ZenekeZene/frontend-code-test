import React from "react";

const coordinatesByDefault = { x: 0, y: 0 };

const useSelectionToolCoordinates = ({  isAnyBoxSelected, handleMouseDown, handleMouseMove, handleMouseUp }) => {
  const hasStarted = React.useRef(false);
  const [startCoordinates, setStartCoordinates] =
    React.useState(coordinatesByDefault);
  const [endCoordinates, setEndCoordinates] =
    React.useState(coordinatesByDefault);

  const coordinates = { start: startCoordinates, end: endCoordinates };

  const onMouseDown = (event) => {
    if (isAnyBoxSelected || hasStarted.current) return;
    if (event.target !== event.currentTarget) return;
    hasStarted.current = true;
    const { clientX: x, clientY: y } = event;
    setStartCoordinates({ x, y });
    setEndCoordinates({ x, y });
    handleMouseDown(event);
  };

  const onMouseMove = (event) => {
    if (!hasStarted.current) return;
    const { clientX, clientY } = event;
    const movedCoordinates = { x: Math.abs(clientX), y: Math.abs(clientY) };
    setEndCoordinates(movedCoordinates);
    handleMouseMove(event);
  };

  const onMouseUp = (event) => {
    handleMouseUp(event);
    hasStarted.current = false;
  };

  return {
    coordinates,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export { useSelectionToolCoordinates };
