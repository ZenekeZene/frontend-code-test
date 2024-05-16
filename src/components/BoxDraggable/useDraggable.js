import React from 'react';
import interact from "interactjs";

const draggableConfig = {
  inertia: false,
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
      endOnly: false
    })
  ]
};

const useDraggable = ({ ref, initialCoordinates, onDragEnd }) => {
	const dragMoveListener = (event) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  };

	const dragEndListener = React.useCallback((event) => {
		const target = event.target;
		const x = parseFloat(target.getAttribute("data-x"));
		const y = parseFloat(target.getAttribute("data-y"));
		onDragEnd({ x, y });
	}, [onDragEnd]);


  React.useEffect(() => {
    let localRef = null;
    if (!ref?.current) return;
    localRef = ref.current;

    ref.current.setAttribute("data-x", initialCoordinates.x);
    ref.current.setAttribute("data-y", initialCoordinates.y);

    interact(localRef)
    .draggable({
      ...draggableConfig,
      listeners: {
        move: dragMoveListener,
        end: dragEndListener,
      }
    });

    return () => {
      if (!localRef) return;
      interact(localRef).unset();
    };
  }, [ref, initialCoordinates, dragEndListener]);
}

export { useDraggable };