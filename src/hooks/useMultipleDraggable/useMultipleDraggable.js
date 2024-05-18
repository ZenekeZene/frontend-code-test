import React from 'react';

const useMultipleDraggable = ({ boxes, dragService }) => {
	const unsets = React.useRef([]);

	const dragMoveListener = React.useCallback((event) => (box) => {
		const delta = { x: event.dx, y: event.dy };
		const { node } = box;
    const x = (parseFloat(node.getAttribute("data-x")) || 0) + delta.x;
    const y = (parseFloat(node.getAttribute("data-y")) || 0) + delta.y;

    node.style.transform = `translate(${x}px, ${y}px)`;

    node.setAttribute("data-x", x);
    node.setAttribute("data-y", y);
  }, []);

  const dragEndListener = React.useCallback((box) => {
		const { node } = box;
    const x = parseFloat(node.getAttribute("data-x"));
    const y = parseFloat(node.getAttribute("data-y"));
    box.move(x, y);
  }, []);

  React.useEffect(() => {
		if (!boxes) return;
		if (boxes.length === 0) return;

		boxes.forEach((box) => {
			const { node } = box;
			node.setAttribute("data-x", box.left);
			node.setAttribute("data-y", box.top);

			const listeners = {
				move: (event) => {
					boxes.forEach(dragMoveListener(event));
				},
				end: () => {
					boxes.forEach(dragEndListener);
				},
			};

			const dragConfig = {
				targetElement: node,
				...listeners,
			};

			const { unset } = dragService(dragConfig).init();
			unsets.current = [...unsets.current, unset];
		});

		return () => {
			unsets.current.forEach((unset) => unset());
		};
  }, [unsets, boxes, dragService, dragEndListener, dragMoveListener]);
};

// TODO: useMultipleDraggable supports multiple and single draggable elements.
// So We can use it in Canvas component and remove useDraggable from BoxDraggable component.

export { useMultipleDraggable };
