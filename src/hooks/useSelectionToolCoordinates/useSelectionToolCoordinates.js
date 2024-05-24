import React from "react";

const coordinatesByDefault = { x: 0, y: 0 };

const useSelectionToolCoordinates = ({ handleMouseMove, handleMouseUp }) => {
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [startCoordinates, setStartCoordinates] =
    React.useState(coordinatesByDefault);
  const [endCoordinates, setEndCoordinates] =
    React.useState(coordinatesByDefault);

  const coordinates = { start: startCoordinates, end: endCoordinates };

  const onMouseDown = (event) => {
    if (isSelecting) return;
    if (event.target !== event.currentTarget) return;
    setIsSelecting(true);
    const { clientX, clientY } = event;
    setStartCoordinates({ x: clientX, y: clientY });
    setEndCoordinates({ x: clientX, y: clientY });
  };

  const onMouseMove = (event) => {
    if (!isSelecting) return;
    const { clientX, clientY } = event;
    const movedCoordinates = { x: Math.abs(clientX), y: Math.abs(clientY) };
    setEndCoordinates(movedCoordinates);
    handleMouseMove(event);
  };

  const onMouseUp = (event) => {
    if (!isSelecting) return;
    setIsSelecting(false);
    handleMouseUp(event);
  };

  return {
    isSelecting,
    coordinates,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export { useSelectionToolCoordinates };
