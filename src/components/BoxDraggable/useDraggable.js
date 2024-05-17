import React from 'react';

const useDraggable = ({ ref, dragService, initialCoordinates, onDragEnd = () => null }) => {
	const dragMoveListener = (event, delta) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + delta.x;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + delta.y;

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

    const dragConfig = {
      targetElement: localRef,
      move: dragMoveListener,
      end: dragEndListener
    };
    const { unset } = dragService(dragConfig).init();

    return () => {
      if (!localRef) return;
      unset();
    };
  }, [ref, dragService, initialCoordinates, dragEndListener]);
}

export { useDraggable };
