import React from "react";
import { isAlive } from "mobx-state-tree";

const useMultipleDraggable = ({
  boxes,
  allBoxes,
  dragService,
  onDragEnd = () => {},
}) => {
  const unsets = React.useRef([]);

  const dragMoveListener = React.useCallback(
    (event) => (box) => {
      const delta = { x: event.dx, y: event.dy };
      const { node } = box;

      const x = (parseFloat(node.getAttribute("data-x")) || 0) + delta.x;
      const y = (parseFloat(node.getAttribute("data-y")) || 0) + delta.y;

      node.style.transform = `translate(${x}px, ${y}px)`;

      node.setAttribute("data-x", x);
      node.setAttribute("data-y", y);
    },
    [],
  );

  const dragEndListener = React.useCallback(
    (box) => {
      const { node } = box;
      const x = parseFloat(node.getAttribute("data-x"));
      const y = parseFloat(node.getAttribute("data-y"));
      onDragEnd(box, { x, y });
    },
    [onDragEnd],
  );

  const updateZIndex = React.useCallback(
    (box) => {
      allBoxes.forEach((anotherBox) => {
        anotherBox.node.style.zIndex = 0;
      });
      box.node.style.zIndex = allBoxes.length + 1;
    },
    [allBoxes],
  );

  React.useEffect(() => {
    if (!boxes) return;
    if (boxes.length === 0) return;

    const boxesAlive = boxes.filter(isAlive);
    boxesAlive.forEach((box) => {
      const { node } = box;
      if (!node) return;
      node.setAttribute("data-x", box.left);
      node.setAttribute("data-y", box.top);

      const listeners = {
        start: () => {
          updateZIndex(box);
        },
        move: (event) => {
          boxesAlive.forEach(dragMoveListener(event));
        },
        end: () => {
          updateZIndex(box);
          boxesAlive.forEach(dragEndListener);
        },
      };

      const dragConfig = {
        targetElement: box.node,
        ...listeners,
      };

      const { unset } = dragService(dragConfig).init();
      unsets.current = [...unsets.current, unset];
    });

    return () => {
      unsets.current.forEach((unset) => unset());
    };
  }, [
    unsets,
    boxes,
    dragService,
    dragEndListener,
    dragMoveListener,
    updateZIndex,
  ]);
};

export { useMultipleDraggable };
